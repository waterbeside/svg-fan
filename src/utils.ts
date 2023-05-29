import { Coord, SvgAttr } from '../typings/types'
import type { Arc } from './class/arc'
import type { Fan } from './class/fan'

export function deg2rad(deg: number) {
  return (deg * Math.PI) / 180
}

/**
 * 通过中心点和半径，求出弧的终点
 * @param center 中心点 [x, y]
 * @param deg 角度
 * @param r 半径
 * @returns 弧终点 [x, y]
 */
export function arcPoint(center: Coord, r: number, deg: number): Coord {
  const [x, y] = center
  const { sin, cos } = Math
  const resX = r * sin(deg2rad(deg))
  const resY = r * cos(deg2rad(deg))
  return [resX + x, y - resY]
}

/**
 * 创建SVG标签
 * @param  tagName    标签名
 * @param  attributes 标签属性，以{key:value}字典形式存在
 * @return svg标签
 */
export function createSvgTag(tagName: string, attributes?: { [k: string]: string | number }) {
  const tag = document.createElementNS('http://www.w3.org/2000/svg', tagName)
  for (const attr in attributes) tag.setAttribute(attr, String(attributes[attr]))
  return tag
}

export function createArcPoints(
  center: Coord,
  r: number,
  R: number,
  startDeg: number,
  endDeg: number
): [Coord, Coord, Coord, Coord] {
  return [
    arcPoint(center, r, startDeg),
    arcPoint(center, R, startDeg),
    arcPoint(center, R, endDeg),
    arcPoint(center, r, endDeg)
  ]
}

export function circlePathD(center: Coord, R: number, r = 0) {
  const [x, y] = center
  if (r <= 0) {
    return `M ${x - R} ${y} A ${R} ${R} 0 1 1 ${x + R} ${y} A ${R} ${R} 1 1 1 ${x - R} ${y} Z`
  }
  return `M ${x - R} ${y} A ${R} ${R} 0 1 1 ${x + R} ${y} A ${R} ${R} 1 1 1 ${x - R} ${y} M ${
    x - r
  } ${y} A ${r} ${r} 0 1 1 ${x + r} ${y} A ${r} ${r} 1 1 1 ${x - r} ${y} Z`
}

export function prettyArcStartAndEnd(
  start: number,
  end: number
): { start: number; end: number; isFull: boolean } {
  let isFull = false
  if (start > end) [start, end] = [end, start]
  if (end - start >= 360) {
    start = start % 360
    end = start + 360
    isFull = true
  }
  return {
    start,
    end,
    isFull
  }
}

export function camel2Hyphen(key: string): string {
  let res: string = ''
  for (let i = 0; i < key.length; i++) {
    let k = key[i]
    if (/([A-Z])/g.test(k)) k = `-${k}`
    res += k
  }
  return res.replace(/--/g, '-').toLowerCase()
}

export function prettyAttr(attr: { [k: string]: any }) {
  const newAttr: { [k: string]: any } = {}
  for (let key in attr) {
    const oKey = key
    if (/([A-Z])/g.test(key)) key = camel2Hyphen(key)
    newAttr[key] = attr[oKey]
  }
  return newAttr
}

export function computeCenter(maxR: number, attr?: SvgAttr): Coord {
  const borderWidth = attr && attr['stroke-width'] ? attr['stroke-width'] : 0
  return [maxR + borderWidth, maxR + borderWidth]
}

export function coumputeFirstArc(
  n: number,
  gap = 0
): { start: number; end: number; preAngle: number } {
  if (n < 1) return { start: 0, end: 360, preAngle: 360 }
  if (n > 360) n = 360
  const preAngle = Math.abs(360 / n - gap)
  const arcDeg = preAngle / 2
  return { start: -arcDeg, end: arcDeg, preAngle }
}

export function mountArc(
  target: HTMLElement | SVGElement | string | DocumentFragment,
  arc: Arc | Fan
) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    let thisEl = arc.getElement()
    if (!el.hasOwnProperty('tagName') || (el as HTMLElement).tagName !== 'svg') {
      const maxR = Math.max(arc.R, arc.r)
      const borderWidth = Number(arc.attr('stroke-width')) ?? 0
      const svg = createSvgTag('svg', {
        width: arc.center[0] + maxR + borderWidth * 2,
        height: arc.center[1] + maxR + borderWidth * 2
      })
      svg.appendChild(thisEl)
      thisEl = svg
    }
    el.appendChild(thisEl)
  } else {
    throw new Error('The target element does not exist')
  }
}
