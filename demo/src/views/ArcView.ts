import { Arc, ArcSetting } from '../../../src/class/arc'
// import { createSvgTag } from '../../src/utils'
import { Section } from '../components/Section'
import { FlexBox } from '../components/FlexBox'
import { createElement } from '../utils'

export function ArcView() {
  const title = '# Arc'
  const arcSettings: ArcSetting[] = [
    {
      r: 20,
      R: 50,
      start: 0,
      end: 360,
      attr: {
        fill: '#813C85'
      }
    },
    {
      r: 20,
      R: 50,
      start: -60,
      end: 60,
      attr: {
        fill: '#FFCC00'
      }
    },
    {
      r: 20,
      R: 50,
      start: 60,
      end: 280,
      attr: {
        fill: '#FF5544'
      }
    },
    {
      r: 0,
      R: 50,
      start: 0,
      end: 120,
      attr: {
        fill: '#443C85'
      },
      text: 'text',
      textAttr: {
        fill: '#fff',
        fontSize: 16,
        fontWeight: 700
      }
    },
    {
      r: 20,
      R: 60,
      start: 120,
      end: 320,
      attr: {
        stroke: '#443C85',
        'stroke-width': 2
      }
    },
    {
      r: 40,
      R: 50,
      start: 0,
      end: 360,
      attr: {
        fill: 'yellow',
        stroke: '#449985',
        'stroke-width': 3
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
