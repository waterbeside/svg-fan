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
  protected _tagName: string
  constructor(setting: SvgSetting) {
    if (setting.attr) Object.assign(this._attr, setting.attr)
    this._tagName = 'svg'
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

  get tagName() {
    return this._tagName
  }

  protected setChildren2Element(el: SVGElement) {
    if (this.children.length) {
      this.children.forEach(v => {
        if (v instanceof SvgBase) {
          el.appendChild(v.getElement())
        } else {
          el.appendChild(v)
        }
      })
    }
  }

  getElement(noChildren = false): SVGElement {
    const svg = createSvgTag('svg')
    if (!noChildren) this.setChildren2Element(svg)
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

  mount(target: HTMLElement | SVGElement | string) {
    if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) el.appendChild(this.getElement())
    } else {
      target.appendChild(this.getElement())
    }
  }
}
