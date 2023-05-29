import { Fan, FanSetting } from '../../../src/class/fan'
// import { createSvgTag } from '../../src/utils'
import { Section } from '../components/Section'
import { FlexBox } from '../components/FlexBox'
import { createElement } from '../utils'

export function FanView() {
  const title = '# Fan'
  const arcSettings: FanSetting[] = [
    {
      r: 50,
      R: 100,
      n: 8,
      straighten: true,
      attr: {
        strokeWidth: 1,
        stroke: '#999'
      },
      arcSetting: []
    },
    {
      r: 50,
      R: 100,
      n: 8,
      attr: {
        strokeWidth: 1,
        stroke: '#999'
      },
      arcSetting: []
    },
    {
      r: 50,
      R: 100,
      n: 12,
      attr: {
        strokeWidth: 2,
        stroke: '#999'
      },
      arcSetting: []
    },
    {
      r: 20,
      R: 100,
      n: 8,
      attr: {
        strokeWidth: 3,
        stroke: '#f0ca9e'
      },
      arcSetting: [
        {
          attr: {
            fill: '#EEE'
          }
        },
        {
          attr: {
            fill: '#fff'
          }
        }
      ]
    }
  ]
  const arcs: HTMLElement[] = []
  arcSettings.forEach(setting => {
    const arc = new Fan(setting)
    const fm = document.createDocumentFragment()
    arc.mount(fm)
    const arcBoxItem = createElement('div', [fm], { class: ['flex-box__item', 'arc-box-item'] })
    arcs.push(arcBoxItem)
  })

  // arc.mount(fm)
  return Section(title, FlexBox(arcs))
}
