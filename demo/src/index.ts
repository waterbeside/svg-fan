import { Arc } from '../../src'
// import { createSvgTag } from '../../src/utils'
import { createSection } from './components/section'
import './index.scss'

declare global {
  interface Window {
    onload: () => any | void
  }
}

// window load
;(function () {
  const h1 = document.createElement('h1')
  h1.innerHTML = 'SVG-FAN DEMO'
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  app.appendChild(h1)
  app.appendChild(createArcs())
  document.getElementsByTagName('body')[0]?.appendChild(app)
})()

// createArc()

function createArcs() {
  const title = 'Demo create Arc'
  const arcSettings = [
    {
      r: 30,
      R: 50,
      startDeg: 0,
      endDeg: 320,
      attr: {
        fill: '#813C85'
      }
    }
  ]
  const arc = new Arc(arcSettings[0])

  const fm = document.createDocumentFragment()
  arc.mount(fm)
  return createSection(title, fm)
}
