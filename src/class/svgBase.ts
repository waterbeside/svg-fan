import type { SvgAttr } from '../../typings/types'
import { createSvgTag, prettyAttr, camel2Hyphen } from '../utils'

type SvgSetting = {
  attr?: SvgAttr
  [key: string]: any
}

type ChildrenElement = SVGElement | SvgBase

export class SvgBase {
  protected _attr: Partial<SvgAttr> = {
    fill: 'transparent'
  }
  protected _resetElement: boolean = true
  readonly children: ChildrenElement[] = []
  protected _tagName: string
  constructor(setting: SvgSetting) {
    if (setting.attr) Object.assign(this._attr, prettyAttr(setting.attr))
    this._tagName = 'svg'
  }

  /**
   * 设置或取得svg属性
   * @param key 如果
   */
  attr(key: string): string | null
  attr(key: object): this
  attr(key: string, value: number | string): this
  attr(key: string | object, value?: number | string): this | string | null {
    if (typeof key === 'string' && value === void 0) {
      key = camel2Hyphen(key)
      return this._attr[key] ?? null
    }
    this._resetElement = true
    if (typeof key === 'string') (key = camel2Hyphen(key)), (this._attr.key = value)
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

  getElement(setting?: { noChildren: boolean }): SVGElement {
    const noChildren = setting?.noChildren || false
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
