'use babel'

import { PACKAGE_CSS_SELECTOR } from './constants'
import { createNode, getImageSourcePath } from './helpers'
import { getAllLanguages } from './language-data'

let $styleSheet = null

const getMargin = (pos) =>
	`margin-${pos}: 0.5em;`

const getCustomCSS = (url) =>
	`background-image: url("${url}");
	background-size: contain;
	width: 1.3em;
	height: 1.3em;
	display: inline-block;
	vertical-align: middle;
	color: transparent;`

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
export function createSelector (config = {}) {
	const { language, selector, emoji, pseudo, spacing, style } = config
	let custom = ''
	let margin = ''

	// Add spacing
	if (spacing && pseudo === 'after') {
		margin = getMargin('left')
	}
	else if (spacing && pseudo === 'before') {
		margin = getMargin('right')
	}
	// Custom emoji
	if (style !== 'native') {
		custom = getCustomCSS(getImageSourcePath({ folderName: style, emoji }))
	}

	return `${language} ${selector}::${pseudo} {
		content: "${emoji}";
		${margin}
		${custom}
	}`
}

/**
 * Loops over a language object and creates the respective stylesheet.
 * @return {String} stylesheet - The stylesheet as string
 */
export function getContent () {
	const { emojiStyles } = atom.config.get('emoji-syntax')
	const allLanguages = getAllLanguages({ filtered: true })
	let content = ''

	allLanguages.forEach(lang => {
		const { internalSettings } = lang
		const userSettings = lang.userSettings.all

		return Object.keys(userSettings)
			.filter(item => internalSettings[item])
			.filter(item =>
				typeof userSettings[item] === 'object' &&
				userSettings[item].active &&
				userSettings[item].emoji
			)
			.forEach(item => {
				content += createSelector({
					language: internalSettings.selector,
					emoji: userSettings[item].emoji,
					selector: internalSettings[item].selector,
					pseudo: userSettings[item].pseudo,
					spacing: userSettings[item].spacing,
					style: emojiStyles.replace(/\s/g, '-').toLowerCase()
				})
			})
	})

	return content
}

/**
 * Creates a `<style>` element based on Atom's `atom.styles.addStyleSheet()`.
 * @param {String} source - The stylesheet's content
 * @param {String} context - Content for custom attribute "content"
 * @param {(Number|String)} priority - Content for custom attribute
 * @return {Object} styleElement - The `<style>` element
 */
export function createStyleSheet ({
	content = getContent(),
	context = 'atom-text-editor',
	priority = 2
} = {}) {
	const $styleElement = createNode('style', {
		textContent: content,
		className: PACKAGE_CSS_SELECTOR,
		attributes: { context, priority }
	})

	$styleElement.context = context
	$styleElement.priority = priority

	return $styleElement
}

/**
 * Assigns the `<style>` element.
 * @return {undefined}
 */
function setStyleSheetElement () {
	$styleSheet = createStyleSheet({ content: getContent() })
}

/**
 * Checks if the stylesheet is available in `<atom-styles>`
 * @return {Boolean}
 */
export function styleSheetExists () {
	return !!atom.stylesElement.querySelector(`.${PACKAGE_CSS_SELECTOR}`)
}

/**
 * Removes the stylesheet element from `<atom-styles>`
 * @return {Boolean}
 */
export function removeStyleSheet () {
	if (styleSheetExists()) {
		atom.styles.removeStyleElement($styleSheet)
		return true
	}
	return false
}

/**
 * Adds the stylesheet element to `<atom-styles>`
 * @return {Boolean}
 */
export function addStyleSheet () {
	if (!styleSheetExists()) {
		setStyleSheetElement()
		atom.styles.addStyleElement($styleSheet)
		return true
	}
	return false
}

/**
 * Removes, creates a new stylesheet and adds it again.
 * @return {undefined}
 */
export function updateStyleSheet () {
	removeStyleSheet()
	setStyleSheetElement()
	addStyleSheet()
}
