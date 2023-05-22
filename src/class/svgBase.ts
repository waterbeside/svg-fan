import type { SvgAttr } from '../../typings/types'
import { createSvgTag } from '../utils'

type SvgSetting = {
  attr?: SvgAttr
  [key: string]: any
}

type ChildrenElement = SVGElement | SvgBase

export class SvgBase {
  protected _attr: Partial<SvgAttr> = {}
  protected _resetElement: boolean = true
  readonly children: ChildrenElement[] = []
  constructor(setting: SvgSetting) {
    if (setting.attr) Object.assign(this._attr, setting.attr)
  }

  /**
   * 设置svg属性
   * @param key 如果
   */
  attr(key: object): this
  attr(key: string, value: number | string): this
  attr(key: string | object, value?: number | string): this {
    this._resetElement = true
    if (typeof key === 'string') this._attr.key = value
    else Object.assign(this._attr, key)
    return this
  }

  getElement(noChildren = false): SVGElement {
    const svg = createSvgTag('svg')
    if (!noChildren && this.children.length) {
      this.children.forEach(v => {
        if (v instanceof SvgBase) {
          svg.appendChild(v.getElement())
        } else {
          svg.appendChild(v)
        }
      })
    }
    return svg
  }

  appendChild(children: ChildrenElement | ChildrenElement[]) {
    if (children instanceof Array) {
      children.forEach(v => this.children.push(v))
    } else {
      this.children.push(children)
    }
  }

  appendTo(svgElement: ChildrenElement[]) {
    if (svgElement instanceof SvgBase) {
      svgElement.appendChild(this)
    }
  }
}
