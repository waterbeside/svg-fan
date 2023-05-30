import {
  arcPoint,
  createArcPoints,
  createSvgTag,
  deg2rad,
  prettyArcStartAndEnd,
  circlePathD,
  prettyAttr,
  computeCenter,
  mountArc,
  getTwoPointsCenter
} from '../utils'
import type { Coord, SvgAttr } from '../../typings/types'
import { SvgBase } from './svgBase'

export type ArcSetting = {
  r: number
  R: number
  center?: [number, number]
  start?: number
  end?: number
  attr?: SvgAttr
  straighten?: boolean
  text?: string | null
  textAttr?: SvgAttr
  [key: string]: any
}

export class Arc extends SvgBase {
  protected _points: [Coord, Coord, Coord, Coord]
  protected _setting: Required<ArcSetting>
  protected _d: string | null = null
  readonly isFull: boolean
  constructor(setting: ArcSetting) {
    super(setting)
    this._tagName = 'path'
    if (setting.attr) Object.assign(this._attr, prettyAttr(setting.attr))
    const defaultSetting = {
      start: 0,
      end: 360,
      straighten: false,
      attr: this._attr,
      text: null,
      textAttr: {}
    }
    const center: Coord =
      setting.center === void 0
        ? computeCenter(Math.max(setting.r, setting.R), this._attr)
        : setting.center

    const config = Object.assign({}, defaultSetting, setting, { center })
    const { start, end, isFull } = prettyArcStartAndEnd(config.start, config.end)
    config.start = start
    config.end = end

    if (setting.textAttr)
      config.textAttr = Object.assign(prettyAttr(config.textAttr), prettyAttr(setting.textAttr))

    this.isFull = isFull

    this._setting = config
    this._points = createArcPoints(config.center, config.r, config.R, config.start, config.end)
  }

  get r() {
    return this._setting.r
  }

  get R() {
    return this._setting.R
  }

  get center(): Coord {
    return this._setting.center.slice() as Coord
  }

  get end() {
    return this._setting.end
  }

  get start() {
    return this._setting.start
  }

  get straighten() {
    return this._setting.straighten && this.end - this.start < 180
  }

  get arcCenter(): Coord {
    if (this.straighten) {
      const s = getTwoPointsCenter(this._points[0], this._points[1])
      const e = getTwoPointsCenter(this._points[2], this._points[3])
      return getTwoPointsCenter(s, e)
    }
    const r = Math.abs(this.R + this.r) / 2
    const deg = (this.end + this.start) / 2
    return arcPoint(this.center, r, deg)
  }

  getD() {
    if (!this._d) {
      if (this.isFull) this._d = circlePathD(this.center, this.R, this.r)
      else {
        const P = this._points
        const flag = deg2rad(this.end) - deg2rad(this.start) > Math.PI ? 1 : 0
        const R = this.R
        const r = this.r
        if (this.straighten) {
          this._d = `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} L ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} L ${P[0][0]} ${P[0][1]} Z`
        } else {
          this._d = `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`
        }
      }
    }
    return this._d
  }

  getElement(setting?: { noChildren: boolean; showText?: boolean }): SVGElement {
    const noChildren = setting?.noChildren || false
    const showText = setting?.showText || true
    const d = this.getD()
    const attr: SvgAttr = {
      d
    }
    if (this.isFull && this.r > 0) attr['fill-rule'] = 'evenodd'
    let se = createSvgTag('path', Object.assign({}, this._attr, attr))
    if (!noChildren) this.setChildren2Element(se)
    if (showText && this._setting.text) {
      const arcCenter = this.arcCenter
      const centerDeg = (this.start + this.end) >> 1
      // const center = this.center
      const t = createSvgTag(
        'text',
        Object.assign(
          {
            y: arcCenter[1],
            x: arcCenter[0],
            fill: 'black',
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            transform: `rotate(${centerDeg} ${arcCenter[0]} ${arcCenter[1]})`
          },
          this._setting.textAttr
        )
      )
      const g = createSvgTag('g')
      t.innerHTML = this._setting.text
      g.appendChild(se)
      g.appendChild(t)
      se = g
    }
    return se
  }

  mount(target: HTMLElement | SVGElement | string | DocumentFragment) {
    return mountArc(target, this)
  }
}
