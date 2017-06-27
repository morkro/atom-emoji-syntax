/** @babel */

/**
 * Creates a HTML element, applies options and returns it.
 * @alias createNode
 * @param {String} tagName - The tag name of the element
 * @param {Object} options - Options which are added to the element
 * @param {String} options.textContent - The appended text
 * @param {String} options.innerHTML - HTML markup as a string
 * @param {String} options.id - The elements ID
 * @param {(String|Array)} options.className - The class names
 * @param {Object} options.attributes - An object of data-attributes
 * @param {HTMLElement} options.append - Similar to innerHTML but with DOM API
 * @return {HTMLElement} $element
 */
export default (tagName, options = {}) => {
  const $element = document.createElement(tagName)
  const { textContent, innerHTML, id, className, attributes, append } = options

  // add text content
  if (textContent) {
    $element.appendChild(document.createTextNode(textContent))
  }
  // add HTML
  if (innerHTML) {
    $element.innerHTML = innerHTML
  }
  // add the id (id="something")
  if (id) {
    $element.id = id
  }
  // add a class name (class="something")
  if (className) {
    if (className instanceof Array) {
      $element.classList.add(...className)
    } else {
      $element.classList.add(className)
    }
  }
  // add all data attributes (data-something="value")
  if (attributes && typeof attributes === 'object') {
    Object.keys(attributes)
      .forEach(attr => $element.setAttribute(attr, attributes[attr]))
  }
  // append child nodes
  if (append) {
    $element.appendChild(append)
  }

  return $element
}
