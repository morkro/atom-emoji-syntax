'use babel'

import { setLanguageStore, getLanguage } from '../lib/language-data'
import * as _ from '../lib/stylesheet'

describe('Emoji StyleSheet Module', () => {
	beforeEach(() => atom.packages.activatePackage('emoji-syntax'))
	afterEach(() => atom.packages.deactivatePackage('emoji-syntax'))

	describe('Creates a CSS selector', () => {
		let selector = null
		let content = null

		beforeEach(() => {
			setLanguageStore()
			const css = getLanguage('css').all
			content = _.getContent()
			selector = _.createSelector({
				language: css.languageSelector,
				emoji: css['@import'].emoji,
				selector: css['@import'].selector,
				pseudo: css['@import'].pseudo,
				spacing: css['@import'].spacing
			})
		})

		it('is a valid CSS selector', () => {
			expect(typeof selector === 'string').toBe(true)
		})

		it('creates correct content', () => {
			expect(typeof content === 'string').toBe(true)
		})
	})

	describe('Creates a valid <style> element', () => {
		let elementDefault = null
		let elementCustom = null

		beforeEach(() => {
			elementDefault = _.createStyleSheet()
			elementCustom = _.createStyleSheet({
				context: 'different-context',
				priority: 'highest'
			})
		})

		it('is a valid HTML element', () => {
			expect(elementDefault instanceof HTMLElement).toBe(true)
			expect(elementDefault.nodeName).toContain('STYLE')
			expect(elementCustom instanceof HTMLElement).toBe(true)
			expect(elementCustom.nodeName).toContain('STYLE')
		})

		it('has content', () => {
			expect(typeof elementDefault.textContent === 'string').toBe(true)
			expect(typeof elementCustom.textContent === 'string').toBe(true)
		})

		describe('Default and custom configuration', () => {
			it('has all default attributes', () => {
				expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true)
				expect(elementDefault.hasAttribute('context')).toBe(true)
				expect(elementDefault.getAttribute('context')).toContain('atom-text-editor')
				expect(elementDefault.hasAttribute('priority')).toBe(true)
				expect(elementDefault.getAttribute('priority')).toContain('2')
			})

			it('has all custom attributes', () => {
				expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true)
				expect(elementCustom.hasAttribute('context')).toBe(true)
				expect(elementCustom.getAttribute('context')).toContain('different-context')
				expect(elementCustom.hasAttribute('priority')).toBe(true)
				expect(elementCustom.getAttribute('priority')).toContain('highest')
			})
		})
	})

	describe('Adds, removes, updates stylesheet', () => {
		it('should add stylesheet', () => {
			_.addStyleSheet()
			expect(_.styleSheetExists()).toBe(true)
		})

		it('should remove stylesheet', () => {
			_.removeStyleSheet()
			expect(_.styleSheetExists()).toBe(false)
		})
	})
})
