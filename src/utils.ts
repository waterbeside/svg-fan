import { Coord } from '../typings/types'

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
