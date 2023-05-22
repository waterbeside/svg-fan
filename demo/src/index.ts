import { Arc } from '../../src'
import { createSvgTag } from '../../src/utils'
import { createSection } from './components/section'

declare global {
  interface Window {
    onload: () => any | void
  }
}

// window load
;((window as Window).onload = function () {
  const h1 = document.createElement('h1')
  h1.innerHTML = 'test Arc 7'
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  app.appendChild(h1)
  app.appendChild(createArc())
  this.document.getElementsByTagName('body')[0]?.appendChild(app)
})()

// createArc()

function createArc() {
  const title = 'Demo create Arc'
  const arc = new Arc({
    r: 100,
    R: 150,
    center: [150, 150],
    startDeg: 0,
    endDeg: 360,
    attr: {
      fill: '#813C85'
    }
  })
  console.log('Arc', arc)

  const fm = document.createDocumentFragment()
  const arcElement = arc.getElement()
  const svg = createSvgTag('svg', { width: '300px', height: '300px' })
  fm.appendChild(svg)
  svg.appendChild(arcElement)
  const text = createSvgTag('text', {
    width: '50px',
    height: '20px',
    text: '乾',
    x: 100,
    y: 50,
    stroke: '#000'
  })
  svg.appendChild(text)
  console.log(222)
  return createSection(title, fm)
}
