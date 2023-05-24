export function createElement(
  tagName: string,
  children?: (HTMLElement | DocumentFragment)[],
  attr?: { class?: string | string[]; [k: string]: any }
) {
  const el = document.createElement(tagName)
  if (attr) {
    for (const k in attr) {
      const value = attr[k]
      if (k === 'class') {
        const classList: string[] = typeof value === 'string' ? [value] : value
        classList.forEach(item => {
          el.classList.add(item)
        })
      } else el.setAttribute(k, String(attr[k]))
    }
  }
  if (children && children.length) children.forEach(item => el.appendChild(item))
  return el
}
