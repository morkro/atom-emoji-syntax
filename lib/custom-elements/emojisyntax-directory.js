'use babel'

import { EMOJI_DIRECTORY_ELEMENT } from '../constants'
import { createNode } from '../helpers'
import { getAllLanguages } from '../language-data'

/**
 * The `<emojisyntax-directory>` element
 * @class DirectoryElement
 * @extends HTMLElement
 */
class DirectoryElement extends HTMLElement {
	createdCallback () {
		// Data
		this.languages = getAllLanguages()
		// Elements
		this.$list = this.createList()
		this.$list.addEventListener('click', this.selectLanguage.bind(this))
		this.appendChild(this.$list)
	}

	/**
	 * Creates the `<ul>` element with all content.
	 * @return {HTMLElement}
	 */
	createList () {
		const fragment = document.createDocumentFragment()
		const $list = createNode('ul', { className: 'list-group' })

		this.languages.forEach((lang, index) =>
			fragment.appendChild(this.createListItem(lang, index))
		)
		$list.appendChild(fragment)

		return $list
	}

	/**
	 * Creates a single list element.
	 * @param  {Object} data - User settings object
	 * @param  {Number} index - Index of the iteration
	 * @return {HTMLElement}
	 */
	createListItem (data = {}, index = 0) {
		const { name, userSettings } = data
		const $li = createNode('li', {
			className: (index === 0) ? ['list-item', 'selected'] : 'list-item',
			attributes: { 'data-emoji-language': name.toLowerCase() }
		})
		const $btn = createNode('button', {
			className: 'btn',
			textContent: name
		})
		const $input = createNode('input', {
			className: 'input-checkbox',
			attributes: { type: 'checkbox' }
		})

		if (userSettings.all.active) {
			$input.setAttribute('checked', 'checked')
		}

		$li.appendChild($input)
		$li.appendChild($btn)

		return $li
	}

	/**
	 * Dispatches off a custom event called `directory-update` containing the language
	 * and active state of the language.
	 * @param  {HTMLElement} target
	 * @return {undefined}
	 */
	selectLanguage ({ target }) {
		const language = target.parentNode.getAttribute('data-emoji-language')

		this.dispatchEvent(new CustomEvent('directory-update', {
			language,
			active: target.checked
		}))
	}
}

export default document.registerElement(
	EMOJI_DIRECTORY_ELEMENT,
	{ prototype: DirectoryElement.prototype }
)
