import { createElement } from '../utils'

export function FlexBox(children?: HTMLElement[]) {
  return createElement('div', children, { class: 'flex-box' })
}
