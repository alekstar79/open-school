const nodes = []

export const dotsrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export function removeNodes()
{
  nodes.forEach(el => el.parentNode && el.parentNode.removeChild(el))
  nodes.splice(0, nodes.length)
}

/**
 * @param {String} type
 * @param {Boolean} multiple
 * @param {Boolean} capture
 * @return {Promise<(String|Blob)>}
 */
export function openFile(type, multiple = false, capture = false)
{
  removeNodes()

  return new Promise(resolve => {
    const input = document.createElement('input'),
      click = new MouseEvent('click', {
        cancelable: true,
        bubbles: true,
        view: window
      })

    input.multiple = multiple
    input.accept = type
    input.type = 'file'

    if (capture) {
      input.capture = 'camera'
    }

    input.addEventListener('change', () => {
      const files = Array.from(input.files)
      multiple ? resolve(files) : resolve(files[0])
    }, false)

    document.body.appendChild(input)
    nodes.push(input)

    input.dispatchEvent(click)
  })
}

/**
 * @param {File|Blob} file
 * @return {Promise<String>}
 */
export function toDataUrl(file)
{
  return new Promise((resolve, reject) => {
    const r = new FileReader()

    r.onload = resolve
    r.onerror = reject

    r.readAsDataURL(file)
  })
}
