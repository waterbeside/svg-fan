import { Arc } from '../../../src'
// import { createSvgTag } from '../../src/utils'
import { Section } from '../components/Section'
import { FlexBox } from '../components/FlexBox'
import { createElement } from '../utils'

export function ArcView() {
  const title = '# Arc'
  const arcSettings = [
    {
      r: 20,
      R: 50,
      startDeg: 0,
      endDeg: 360,
      attr: {
        fill: '#813C85'
      }
    },
    {
      r: 20,
      R: 50,
      startDeg: -60,
      endDeg: 60,
      attr: {
        fill: '#FFCC00'
      }
    },
    {
      r: 20,
      R: 50,
      startDeg: 60,
      endDeg: 280,
      attr: {
        fill: '#FF5544'
      }
    }
  ]
  const arcs: HTMLElement[] = []
  arcSettings.forEach(setting => {
    const arc = new Arc(setting)
    const fm = document.createDocumentFragment()
    arc.mount(fm)
    const arcBoxItem = createElement('div', [fm], { class: ['flex-box__item', 'arc-box-item'] })
    arcs.push(arcBoxItem)
  })

  // arc.mount(fm)
  return Section(title, FlexBox(arcs))
}
