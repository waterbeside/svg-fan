import { createElement } from '../../../src/utils'

export function FlexBox(children?: HTMLElement[]) {
  return createElement('div', children, { class: 'flex-box' })
}
