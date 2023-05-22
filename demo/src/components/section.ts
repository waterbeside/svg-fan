export function createSection(title: string, children: HTMLElement | string | DocumentFragment) {
  const fm = document.createDocumentFragment()
  const section = document.createElement('section')
  const h2 = document.createElement('h2')
  h2.innerText = title
  if (typeof children !== 'string') {
    section.appendChild(children)
  } else {
    section.innerHTML = children
  }
  fm.appendChild(h2)
  fm.appendChild(section)
  return fm
}
