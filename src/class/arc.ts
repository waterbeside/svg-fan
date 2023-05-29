import {
  createArcPoints,
  createSvgTag,
  deg2rad,
  prettyArcStartAndEnd,
  circlePathD,
  prettyAttr,
  computeCenter,
  mountArc
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
      attr: this._attr
    }
    const center: Coord =
      setting.center === void 0
        ? computeCenter(Math.max(setting.r, setting.R), this._attr)
        : setting.center

    const config = Object.assign({}, defaultSetting, setting, { center })
    const { start, end, isFull } = prettyArcStartAndEnd(config.start, config.end)
    config.start = start
    config.end = end
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

  getD() {
    if (!this._d) {
      if (this.isFull) this._d = circlePathD(this.center, this.R, this.r)
      else {
        const P = this._points
        const flag = deg2rad(this.end) - deg2rad(this.start) > Math.PI ? 1 : 0
        const R = this.R
        const r = this.r
        if (this._setting.straighten && this.end - this.start < 180) {
          this._d = `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} L ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} L ${P[0][0]} ${P[0][1]} Z`
        } else {
          this._d = `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`
        }
      }
    }
    return this._d
  }

  getElement(noChildren = false): SVGElement {
    const d = this.getD()
    const attr: SvgAttr = {
      d
    }
    if (this.isFull && this.r > 0) attr['fill-rule'] = 'evenodd'
    const se = createSvgTag('path', Object.assign({}, this._attr, attr))
    if (!noChildren) this.setChildren2Element(se)
    return se
  }

  mount(target: HTMLElement | SVGElement | string | DocumentFragment) {
    return mountArc(target, this)
  }
}
