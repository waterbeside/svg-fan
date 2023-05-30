import './index.scss'

import { ArcView } from './views/ArcView'
import { TrapezoidView } from './views/TrapezoidView'
import { FanView } from './views/FanView'
import { ReadMeView } from './views/ReadMe'

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
  app.appendChild(TrapezoidView())
  app.appendChild(FanView())
  app.appendChild(ReadMeView())
  document.getElementsByTagName('body')[0]?.appendChild(app)
})()

// createArc()
