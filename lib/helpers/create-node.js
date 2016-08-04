'use babel'

/**
 * Creates a HTML element, applies options and returns it.
 * @param {String} tagName - The tag name of the element
 * @param {Object} options - Options which are added to the element
 * @param {String} options.textContent - The appended text
 * @param {String} options.innerHTML - HTML markup as a string
 * @param {String} options.id - The elements ID
 * @param {(String|Array)} options.className - The class names
 * @param {Object} options.attributes - An object of data-attributes
 * @param {HTMLElement} options.append - Similar to innerHTML but with DOM API
 * @return {Object} The HTMLElement
 */
export default function createNode (tagName, options = {}) {
	const element = document.createElement(tagName)

	// add text content
	if (options.textContent) {
		element.appendChild(document.createTextNode(options.textContent))
	}
	if (options.innerHTML) {
		element.innerHTML = options.innerHTML
	}
	// add the id (id="something")
	if (options.id) element.id = options.id
	// add a class name (class="something")
	if (options.className) {
		if (options.className instanceof Array) {
			element.classList.add(...options.className)
		}
		else {
			element.classList.add(options.className)
		}
	}
	// add all data attributes (data-something="value")
	if (options.attributes && typeof options.attributes === 'object') {
		Object.keys(options.attributes).forEach(
			attr => element.setAttribute(attr, options.attributes[attr])
		)
	}
	// append child nodes
	if (options.append) element.appendChild(options.append)

	return element
}
