'use babel'

// Helpers
import createNode from './helpers/create-node'
import getImageSourcePath from './helpers/get-source-path'
// Core
import { getAllLanguages } from './language-data'

const styleSheetSelector = Symbol('selector')
const styleSheet = Symbol('stylesheet')

const EmojiStyleSheet = {
	[styleSheetSelector]: 'emoji-syntax-stylesheet',
	[styleSheet]: null,

	/**
	 * Creates a `<style>` element based on Atom's `atom.styles.addStyleSheet()`.
	 * @param {String} source - The stylesheet's content
	 * @param {String} context - Content for custom attribute "content"
	 * @param {(Number|String)} priority - Content for custom attribute
	 * @return {Object} styleElement - The `<style>` element
	 */
	createElement ({
		content = this.getContent(),
		context = 'atom-text-editor',
		priority = 2
	} = {}) {
		const styleElement = createNode('style', {
			textContent: content,
			className: this[styleSheetSelector],
			attributes: { context, priority }
		})

		styleElement.context = context
		styleElement.priority = priority

		return styleElement
	},

	/**
	 * Creates a single CSS selector string.
	 * @param {Object} config - Configuration
	 * @param {String} config.language - The language specific CSS selector
	 * @param {String} config.selector - Selector of the keyword used by Atom
	 * @param {String} config.emoji - Must be unicode character
	 * @param {String} config.pseudo - Determines the position of the emoji
	 * @param {Boolean} config.spacing - Bool if the emoji should have spacing
	 * @return {String} The computed selector string
	 */
	createSelector (config = {}) {
		const { language, selector, emoji, pseudo, spacing, style } = config
		let custom = ''
		let margin = ''

		// Add spacing
		if (spacing && pseudo === 'after') {
			margin = 'margin-left: 0.5em;'
		}
		else if (spacing && pseudo === 'before') {
			margin = 'margin-right: 0.5em;'
		}
		// Custom emoji
		if (style !== 'native') {
			const url = getImageSourcePath({ folderName: style, emoji })
			custom = `
				background-image: url("${url}");
				background-size: contain;
				width: 1.5em;
				height: 1.5em;
				display: inline-block;
				vertical-align: middle;
				color: transparent;
			`
		}

		return `${language} ${selector}::${pseudo} {
			content: "${emoji}";
			${margin}
			${custom}
		}`
	},

	/**
	 * Loops over a language object and creates the respective stylesheet.
	 * @return {String} stylesheet - The stylesheet as string
	 */
	getContent () {
		const { emojiStyles } = atom.config.get('emoji-syntax')
		const allLanguages = getAllLanguages({ filtered: true })
		let content = ''

		allLanguages.forEach(lang => {
			const { languageSelector } = lang
			const list = Object.keys(lang).filter(item => !!lang[item].emoji)

			list.forEach(item => {
				if (lang[item].active) {
					content += this.createSelector({
						language: languageSelector,
						emoji: lang[item].emoji,
						selector: lang[item].selector,
						pseudo: lang[item].pseudo,
						spacing: lang[item].spacing,
						style: emojiStyles.replace(/\s/g, '-').toLowerCase()
					})
				}
			})
		})

		return content
	},

	/**
	 * Checks if the stylesheet is available in `<atom-styles>`
	 * @return {Boolean}
	 */
	exists () {
		return !!atom.stylesElement.querySelector(`.${this[styleSheetSelector]}`)
	},

	/**
	 * Removes the stylesheet element from `<atom-styles>`
	 * @return {Boolean}
	 */
	remove () {
		if (this.exists()) {
			atom.styles.removeStyleElement(this[styleSheet])
			return true
		}
		return false
	},

	/**
	 * Adds the stylesheet element to `<atom-styles>`
	 * @return {Boolean}
	 */
	add () {
		if (!this.exists()) {
			this.set()
			atom.styles.addStyleElement(this[styleSheet])
			return true
		}
		return false
	},

	/**
	 * Removes, creates a new stylesheet and adds it again.
	 * @return {undefined}
	 */
	update () {
		this.remove()
		this.set()
		this.add()
	},

	/**
	 * Assigns the `<style>` element.
	 * @return {undefined}
	 */
	set () {
		this[styleSheet] = this.createElement({ content: this.getContent() })
	},

	/**
	 * Returns the `<style>` element
	 * @return {Object|null} styleSheet - The `<style>` element
	 */
	get () {
		return this[styleSheet]
	}
}

export default EmojiStyleSheet
