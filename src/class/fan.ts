import type { SvgAttr, Coord } from '../../typings/types'
import { computeCenter, coumputeFirstArc, prettyAttr, createSvgTag, mountArc } from '../utils'
import { SvgBase } from './svgBase'
import { Arc, ArcSetting } from './arc'

export type FanSetting = {
  r: number
  R: number
  n: number
  start?: number
  straighten?: boolean
  gap?: number
  center?: Coord
  attr?: SvgAttr
  arcSetting?: Omit<Partial<ArcSetting>, 'center'>[]
}

export class Fan extends SvgBase {
  readonly _setting: Required<FanSetting>
  readonly arcs: Arc[] = []
  readonly _attr: SvgAttr = {
    fill: 'transparent',
    strokeWidth: 1,
    stroke: 'grey'
  }
  constructor(setting: FanSetting) {
    super(setting)
    this._attr = prettyAttr(this._attr)
    if (setting.attr) Object.assign(this._attr, prettyAttr(setting.attr))

    const defaultSetting = {
      gap: 0,
      straighten: false,
      attr: this._attr,
      center: computeCenter(Math.max(setting.r, setting.R), this._attr),
      arcSetting: []
    }
    let { start, preAngle } = coumputeFirstArc(setting.n, setting.gap)
    if (setting.start !== void 0) start = setting.start
    this._setting = Object.assign({}, defaultSetting, setting, { start })
    const arcs = []
    let currentStart = start
    const arcSettingLen = this._setting.arcSetting.length || 1
    for (let i = 0; i < setting.n; i++) {
      const end = currentStart + preAngle
      let arcSetting = this._setting.arcSetting[i % arcSettingLen]
      const attr = Object.assign({}, this._attr, arcSetting?.attr ?? {})
      const itemSetting = Object.assign({}, this._setting, arcSetting ?? {}, {
        start: currentStart,
        end,
        attr
      })
      const arc = new Arc(itemSetting)
      currentStart = end + this._setting.gap
      arcs.push(arc)
    }
    this.arcs = arcs
  }

  get center() {
    return this._setting.center
  }

  get r() {
    return this._setting.r
  }

  get R() {
    return this._setting.R
  }

  getElement(noChildren?: boolean, tag = 'g'): SVGElement {
    const g = createSvgTag(tag)
    for (let i = 0; i < this.arcs.length; i++) {
      g.appendChild(this.arcs[i].getElement(false))
    }
    if (!noChildren) this.setChildren2Element(g)
    return g
  }

  mount(target: HTMLElement | SVGElement | string | DocumentFragment) {
    return mountArc(target, this)
  }
}
