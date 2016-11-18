'use babel'

import { createNode, getHexadecimalUnicode } from '../helpers'
import { EMOJI_KEYWORD_ELEMENT } from '../constants'

/**
 * The `<emojisyntax-keyword>` element
 * @class KeywordElement
 * @extends HTMLElement
 */
class KeywordElement extends HTMLElement {
	createdCallback () {
		// Data
		this.imagePath = null
		this.emoji = {
			$el: createNode('span', { className: 'emoji-native' }),
			data: null
		}
		this.unicode = {
			$el: createNode('span', { className: 'emoji-unicode' }),
			data: null
		}
		// Elements
		this.$wrapper = createNode('div', { className: 'emoji-options' })
		this.$status = this.createStatusElement()
		this.$type = this.createTypeElement()
		this.$position = this.createPositionElement()
		this.$spacing = this.createSpacingElement()

		this.$wrapper.appendChild(this.$status)
		this.$wrapper.appendChild(this.$type)
		this.$wrapper.appendChild(this.$position)
		this.$wrapper.appendChild(this.$spacing)
		this.appendChild(this.$wrapper)
	}

	/**
	 * Dispatches a custom event
	 * @param {String} name
	 * @param {Object} detail
	 * @return {undefined}
	 */
	dispatchElementUpdate (name, detail = {}) {
		if (!name) return
		this.dispatchEvent(new CustomEvent(name, { detail }))
	}

	/**
	 * Creates the checkbox for the status.
	 * @return {HTMLElement}
	 */
	createStatusElement () {
		return createNode('div', {
			className: ['block', 'option-activate'],
			innerHTML: `
				<label>
					<input type="checkbox" data-option="active"
					class="emoji-toggle-active input-checkbox">
					<h3><code></code></h3>
				</label
			`
		})
	}

	/**
	 * Creates the emoji configuration markup.
	 * @param {String} value - The emoji character
	 * @return {HTMLElement}
	 */
	createTypeElement () {
		return createNode('div', {
			className: ['block', 'option-emoji'],
			innerHTML: `
				<div>Emoji:</div>
				<button class="emoji-open-list badge icon icon-gear"></button>
			`
		})
	}

	/**
	 * Creates the position configuration markup.
	 * @return {HTMLElement}
	 */
	createPositionElement () {
		return createNode('div', {
			className: ['block', 'option-pseudo'],
			innerHTML: `
				<div>Position:</div>
				<div class="btn-group">
					<button
					class="btn emoji-toggle-position"
					data-position="before">Before</button>
					<button
					class="btn emoji-toggle-position"
					data-position="after">After</button>
				</div>
			`
		})
	}

	/**
	 * Creates the checkbox configuration markup for spacing.
	 * @return {HTMLElement}
	 */
	createSpacingElement () {
		return createNode('div', {
			className: ['block', 'option-spacing'],
			innerHTML: `
				<label>
					<div>Spacing:</div>
					<input type="checkbox" data-option="spacing"
					class="emoji-toggle-active input-checkbox">
				</label>
			`
		})
	}

	/**
	 * Updates the language settings, depending on what the user clicks.
	 * @param {Object} event
	 * @return {undefined}
	 */
	manageSettingsData (event) {
		const { target } = event
		const { contains, toggle } = target.classList
		let name = null
		let config = null

		if (!(target instanceof HTMLElement)) {
			return
		}

		// User toggles keyword state
		if (contains('emoji-toggle-active')) {
			toggle('btn-primary')
			name = 'update-keyword'
			config = {
				lang: this.getAttribute('data-language'),
				keyword: this.getAttribute('data-keyword'),
				property: target.getAttribute('data-option'),
				newValue: !!contains('btn-primary')
			}
		}

		// User toggles emoji positioning
		else if (contains('emoji-toggle-position')) {
			const position = target.getAttribute('data-position')

			if (position === 'before') {
				target.nextElementSibling.classList.remove('selected')
			}
			else if (position === 'after') {
				target.previousElementSibling.classList.remove('selected')
			}

			target.classList.add('selected')
			name = 'update-keyword'
			config = {
				lang: this.getAttribute('data-language'),
				keyword: this.getAttribute('data-keyword'),
				property: 'pseudo',
				newValue: position
			}
		}

		// User opens emoji list
		else if (
			contains('emoji-open-list') ||
			contains('emoji-native') ||
			contains('emoji-unicode')
		) {
			name = 'open-list'
			config = {
				current: this.querySelector('.emoji-native').textContent,
				language: this.getAttribute('data-language'),
				keyword: this.getAttribute('data-keyword')
			}
		}

		if (config !== null && typeof config === 'object') {
			this.dispatchElementUpdate(name, config)
		}
	}

	/**
	 * Updates the lanuage selector and content of `.option-emoji`
	 * with the new emoji.
	 * @param {Object} settings
	 * @param {String} settings.lang
	 * @param {String} settings.keyword
	 * @param {String} settings.emoji
	 * @return {undefined}
	 */
	updateSettings (settings = {}) {
		const { lang, keyword, emoji } = settings

		this.emoji.data = emoji
		this.emoji.$el.textContent = emoji
		this.unicode.data = getHexadecimalUnicode(emoji)
		this.updateImagePath()

		this.dispatchElementUpdate('update-keyword', {
			lang, keyword, property: 'emoji', newValue: emoji
		})
	}

	/**
	 * Toggles the emoji button preview.
	 * @param {String} name
	 * @return {undefined}
	 */
	toggleUnicodeEmoji (name) {
		if (name === 'Native') {
			this.unicode.$el.style.display = 'none'
			this.emoji.$el.style.display = 'block'
		}
		else {
			this.unicode.$el.style.display = 'inline-block'
			this.emoji.$el.style.display = 'none'
		}
	}

	/**
	 * Updates the image path to custom emoji.
	 * @param {String} path
	 * @return {undefined}
	 */
	updateImagePath (path = this.imagePath) {
		const { $el, data } = this.unicode
		this.imagePath = path
		$el.style.backgroundImage = `url(${this.imagePath}/${data}.svg)`
	}

	/**
	 * Initialization method to start the custom element.
	 * @param {Object} options
	 * @param {Object} options.content
	 * @param {String} options.language
	 * @param {String} options.keyword
	 * @return {undefined}
	 */
	initialize (options = {}) {
		const { language, keyword, content } = options
		const { emoji, pseudo, spacing, active } = content
		const hexUnicode = getHexadecimalUnicode(emoji)

		this.emoji.data = emoji
		this.unicode.data = hexUnicode
		this.emoji.$el.textContent = emoji
		this.setAttribute('data-language', language.toLowerCase())
		this.setAttribute('data-keyword', keyword.toLowerCase())
		this.addEventListener('click', this.manageSettingsData)

		// Initialise status element
		const $statusName = this.$status.querySelector('code')
		const $statusCheckbox = this.$status.querySelector('input')
		$statusName.textContent = keyword
		$statusCheckbox.checked = active

		// Initialise type element
		const $typeButton = this.$type.querySelector('button')
		$typeButton.appendChild(this.emoji.$el)
		$typeButton.appendChild(this.unicode.$el)
		this.$type.setAttribute('data-emoji', emoji)
		this.$type.setAttribute('data-unicode', hexUnicode)

		// Initialise position element
		const $positionButton = this.$position.querySelector(`[data-position="${pseudo}"]`)
		$positionButton.classList.add('selected')

		// Initialise spacing element
		const $spacingCheckbox = this.$spacing.querySelector('input')
		$spacingCheckbox.checked = spacing
	}
}

export default document.registerElement(
	EMOJI_KEYWORD_ELEMENT,
	{ prototype: KeywordElement.prototype }
)
