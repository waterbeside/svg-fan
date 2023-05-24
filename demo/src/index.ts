import './index.scss'

import { ArcView } from './views/ArcView'

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
  app.appendChild(ArcView())
  document.getElementsByTagName('body')[0]?.appendChild(app)
})()

// createArc()
