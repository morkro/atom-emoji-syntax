'use babel'

import { KeywordElement } from '../lib/custom-elements'
import { setLanguageStore, getLanguage } from '../lib/language-data'

/**
 * @todo Add functional testing. Right now there is only basic DOM testing.
 */
describe('<emoji-keyword>', () => {
	let exampleLanguage = null
	const $element = new KeywordElement()

	beforeEach(() => {
		setLanguageStore()
		exampleLanguage = getLanguage('javascript')
		$element.initialize({
			language: exampleLanguage.name,
			selector: exampleLanguage.internalSettings.selector,
			keyword: 'import',
			content: exampleLanguage.userSettings.all.import
		})
	})

	it('is correctly created and has all data-attributes', () => {
		expect($element).toBeDefined()
		expect($element.hasAttribute('data-language')).toBe(true)
		expect($element.hasAttribute('data-keyword')).toBe(true)
	})

	it('has a headline with content', () => {
		const $headline = $element.querySelector('h3 code')
		expect($headline).toBeDefined()
		expect($headline.textContent.length).toBeGreaterThan(0)
		expect($headline.textContent).not.toBeUndefined()
	})

	it('contains the options wrapper', () => {
		expect($element.querySelector('.emoji-options')).toBeDefined()
	})

	it('has all options', () => {
		expect($element.querySelector('.option-activate')).toBeDefined()
		expect($element.querySelector('.option-emoji')).toBeDefined()
		expect($element.querySelector('.option-pseudo')).toBeDefined()
		expect($element.querySelector('.option-spacing')).toBeDefined()
	})
})
