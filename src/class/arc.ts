import { createArcPoints, createSvgTag, deg2rad, prettyArcStartAndEnd, circlePathD } from '../utils'
import type { Coord, SvgAttr } from '../../typings/types'
import { SvgBase } from './svgBase'

type ArcSetting = {
  r: number
  R: number
  center: [number, number]
  startDeg?: number
  endDeg?: number
  attr?: SvgAttr
  [key: string]: any
}

export class Arc extends SvgBase {
  protected _points: [Coord, Coord, Coord, Coord]
  protected _arcSetting: Omit<Required<ArcSetting>, 'attr'>
  protected _element: SVGElement | null = null
  protected _d: string | null = null
  readonly isFull: boolean
  constructor(setting: ArcSetting) {
    super(setting)
    const defaultSetting = {
      startDeg: 0,
      endDeg: 360
    }
    const config = Object.assign({}, defaultSetting, {
      r: setting.r,
      R: setting.R,
      center: setting.center,
      startDeg: setting.startDeg,
      endDeg: setting.endDeg
    })
    const { start, end, isFull } = prettyArcStartAndEnd(config.startDeg, config.endDeg)
    config.startDeg = start
    config.endDeg = end
    this.isFull = isFull
    this._arcSetting = config
    if (setting.attr) Object.assign(this._attr, setting.attr)
    this._points = createArcPoints(
      config.center,
      config.r,
      config.R,
      config.startDeg,
      config.endDeg
    )
    console.log(config)
  }

  get r() {
    return this._arcSetting.r
  }

  get R() {
    return this._arcSetting.R
  }

  get center() {
    return this._arcSetting.center.slice()
  }

  get gCenter() {
    return this._arcSetting.center.slice()
  }

  get endDeg() {
    return this._arcSetting.endDeg
  }

  get startDeg() {
    return this._arcSetting.startDeg
  }

  getD() {
    if (!this._d) {
      if (this.isFull) this._d = circlePathD(this.center, this.R, this.r)
      else {
        const P = this._points
        console.log('ps', P)
        const flag = deg2rad(this.endDeg) - deg2rad(this.startDeg) > Math.PI ? 1 : 0
        const R = this.R
        const r = this.r
        this._d = `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`
      }
    }
    return this._d
  }

  getElement(): SVGElement {
    if (!this._element || this._resetElement) {
      const d = this.getD()
      const attr: SvgAttr = {
        d
      }
      if (this.isFull && this.r > 0) {
        attr['fill-rule'] = 'evenodd'
      }
      this._element = createSvgTag('path', Object.assign({}, this._attr, attr))
    }
    this._resetElement = false
    return this._element
  }
}
