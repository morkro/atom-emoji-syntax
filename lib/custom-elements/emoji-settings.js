'use babel'

// Helpers
import createNode from '../helpers/create-node'
// Custom elements
import ListElement from './emoji-list'
import KeywordElement from './emoji-keyword'
// Core
import { getAllLanguages, getLanguage } from '../language-data'

/**
 * The `<emoji-settings>` element.
 * @class SettingsElement
 * @extends HTMLElement
 */
class SettingsElement extends HTMLElement {
	createdCallback () {
		// Data
		this.viewTitle = 'Emoji Syntax: Settings'
		this.languages = getAllLanguages()
		this.emojiStyle = null
		this.imagePath = null
		this.selected = { language: null, keyword: null }
		this.keywordsList = []
		// Elements
		this.overlay = createNode('div', { className: 'settings-overlay' })
		this.overlay.addEventListener('click', this.closeEmojiList)
		this.emojiList = new ListElement()
		this.emojiList.addEventListener(
			'update-emoji', this.updateEmojiSettings.bind(this)
		)
		this.header = this.createHeader()
		this.appendChild(this.overlay)
		this.appendChild(this.emojiList)
		this.appendChild(this.header)
		this.languages.forEach(lang => {
			const panel = this.createPanel(lang)
			return this.appendChild(panel)
		})
	}

	/**
	 * Updates internal data.
	 * @return {undefined}
	 */
	updateSelected ({ language, keyword }) {
		this.selected.language = language
		this.selected.keyword = keyword
	}

	/**
	 * Creates the header area of the settings page.
	 * @return {HTMLElement}
	 */
	createHeader () {
		const header = createNode('header')
		const group = createNode('section')
		const title = createNode('h1', { textContent: `${this.viewTitle} 🔧` })
		const subline = createNode('h3', {
			className: ['icon', 'icon-paintcan'],
			innerHTML: `Active emoji style: <span>${this.emojiStyle}</span>`
		})
		const toggleLanguages = createNode('button', {
			className: ['btn', 'toggle-languages'],
			textContent: 'Toggle all sections'
		})

		group.appendChild(title)
		group.appendChild(subline)
		header.appendChild(group)
		header.appendChild(toggleLanguages)
		header.addEventListener('click', this.toggleColumns)

		return header
	}

	/**
	 * Creates a panel element with all keywords.
	 * @param {Object} data
	 * @return {HTMLElement}
	 */
	createPanel (data = {}) {
		const activeButton = data.active ? 'btn-primary selected' : ''
		const btnClasses = 'btn-toggle-language btn btn-sm icon icon-check'
		const wrapper = createNode('atom-panel', {
			className: ['top', 'inset-panel'],
			attributes: { 'data-emoji-language': data.languageName.toLowerCase() },
			innerHTML: `
				<div class="panel-heading">
					<div class="panel-group">
						<button class="${btnClasses} ${activeButton}"></button>
						<h2 class="inline-block">${data.languageName}</h2>
					</div>
				</div>
				<div class="panel-body"></div>
			`
		})

		if (!data.active) {
			wrapper.classList.add('is-inactive', 'is-collapsed')
		}

		// Grab .panel-heading and .panel-body
		const [panelHeading, panelBody] =
			Object.keys(wrapper.children).map(e => wrapper.children[e])
		panelHeading.addEventListener('click', this.managePanelItem)
		this.createKeywordElements(data, panelBody)

		return wrapper
	}

	/**
	 * Creates keyword elements and appends them to given parent element.
	 * @param {Object} data
	 * @param {HTMLElement} parent
	 * @return {undefined}
	 */
	createKeywordElements (data, parent) {
		const { languageName, languageSelector } = data
		const keywordData = Object.keys(data).filter(lang => !!data[lang].emoji)

		keywordData.forEach(lang => {
			const keyword = new KeywordElement()

			keyword.initialize({
				language: languageName,
				selector: languageSelector,
				keyword: lang,
				content: data[lang]
			})

			keyword.addEventListener('open-list', this.openListView.bind(this))
			keyword.addEventListener('update-keyword', event => {
				this.emitter.emit('update-stylesheet', event.detail)
			})

			this.keywordsList.push(keyword)
			parent.appendChild(keyword)
		})
	}

	/**
	 * Updates internal data, adds a class to itself and
	 * updates the `<emoji-list>` element.
	 * @param {Object} event
	 * @return {undefined}
	 */
	openListView (event) {
		const { current, language, keyword } = event.detail
		this.emojiList.setCurrent(current)
		this.classList.toggle('emoji-overlay')
		this.updateSelected({ language, keyword })
	}

	/**
	 * Activates/deactivates a panel.
	 * @param {Object} event
	 * @return {undefined}
	 */
	managePanelItem (event) {
		const { target } = event
		const isElement = target instanceof HTMLElement
		const parent = this.parentNode

		if (isElement && target.nodeName === 'H2') {
			parent.classList.toggle('is-collapsed')
		}
		else if (isElement && target.classList.contains('btn-toggle-language')) {
			const language = getLanguage(parent.getAttribute('data-emoji-language'))
			const emitter = parent.parentNode.emitter

			parent.classList.toggle('is-collapsed')
			parent.classList.toggle('is-inactive')
			target.classList.toggle('btn-primary')
			target.classList.toggle('selected')

			language.set('active', !!target.classList.contains('selected'))
			emitter.emit('update-stylesheet')
		}
	}

	/**
	 * Toggles all columns.
	 * @param {Object} event
	 * @return {undefined}
	 */
	toggleColumns (event) {
		const panels = this.parentNode.querySelectorAll('atom-panel')

		if (event.target.classList.contains('toggle-languages')) {
			[...panels].forEach(item => {
				if (!item.classList.contains('is-collapsed')) {
					item.classList.add('is-collapsed')
				}
				else {
					item.classList.remove('is-collapsed')
				}
			})
		}
	}

	/**
	 * Removes the `.emoji-overlay` class.
	 * @return {undefined}
	 */
	closeEmojiList () {
		const parent = this.parentNode
		if (parent.classList.contains('emoji-overlay')) {
			parent.classList.remove('emoji-overlay')
		}
	}

	/**
	 * Updates the emoji settings.
	 * @param {Object} event
	 * @param {Object} event.detail
	 * @param {String} event.detail.emoji
	 * @param {String} event.detail.lang
	 * @param {String} event.detail.keyword
	 * @return {undefined}
	 */
	updateEmojiSettings (event) {
		const { emoji } = event.detail
		const { language: lang, keyword } = this.selected
		const keywordElement = this.querySelector(
			`[data-language="${lang}"][data-keyword="${keyword}"]`
		)

		keywordElement.updateSettings({ emoji, lang, keyword })
		this.classList.toggle('emoji-overlay')
		this.updateSelected({ language: null, keyword: null })
	}

	/**
	 * Changes the `emoji-style` attribute on `<emoji-settings>` and `<emoji-style>`
	 * @param {Object} data
	 * @return {undefined}
	 */
	onChangeEmojiStyle (data) {
		const { attr, style, path } = data
		const keywords = [...this.querySelectorAll('emoji-keyword')]
		const headlineSpan = this.querySelector('header h3 span')

		this.setAttribute('emoji-style', attr)
		this.emojiList.setEmojiStyles(attr)

		headlineSpan.textContent = style
		keywords.forEach(item => {
			item.updateImagePath(path)
			item.toggleUnicodeEmoji(style)
		})
	}

	/**
	 * Initializes the `<emoji-settings>` element.
	 * @param {Object} emitter
	 * @param {String} style
	 * @param {String} attr
	 * @param {String} imagePath
	 * @return {undefined}
	 */
	initialize ({ emitter, style, attr, imagePath }) {
		this.imagePath = imagePath
		this.emojiStyle = style
		this.emitter = emitter
		this.emitter.on(
			'emoji-settings:update', this.onChangeEmojiStyle.bind(this)
		)

		this.setAttribute('emoji-style', attr)
		this.header.querySelector('h3 span').textContent = this.emojiStyle
		this.emojiList.setEmojiStyles(attr)
		this.keywordsList.forEach(item => {
			item.updateImagePath(this.imagePath)
			item.toggleUnicodeEmoji(this.emojiStyle)
		})
	}

	/**
	 * Required method for Atom. Currently not in use.
	 * @return {undefined}
	 */
	serialize () {}

	/**
	 * Returns the title of the element.
	 * @return {String}
	 */
	getTitle () {
		return this.viewTitle
	}

	/**
	 * Returns the icon name of the element.
	 * @return {String}
	 */
	getIconName () {
		return 'emoji-syntax'
	}
}

export default document.registerElement(
	'emoji-settings',
	{ prototype: SettingsElement.prototype }
)
