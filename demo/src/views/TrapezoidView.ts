import { Arc, ArcSetting } from '../../../src/class/arc'
import { createElement } from '../../../src/utils'
import { Section } from '../components/Section'
import { FlexBox } from '../components/FlexBox'

export function TrapezoidView() {
  const title = '# trapezoid'
  const arcSettings: ArcSetting[] = [
    {
      r: 20,
      R: 50,
      start: 0,
      end: 60,
      straighten: true,
      attr: {
        fill: '#9e3944'
      }
    },
    {
      r: 20,
      R: 50,
      start: 60,
      end: 120,
      straighten: true,
      attr: {
        fill: '#F81144'
      }
    },
    {
      r: 0,
      R: 60,
      start: 135,
      end: 225,
      straighten: true,
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
