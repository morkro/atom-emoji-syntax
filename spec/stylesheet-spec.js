'use babel';

import languages from '../lib/get-languages';
import { getHexadecimalUnicode } from '../lib/helpers/unicode';
import EmojiStyleSheet from '../lib/stylesheet';

describe('Emoji StyleSheet Module', () => {
	atom.packages.activatePackage('emoji-syntax');

	describe('Creates a CSS selector', () => {
		const css = languages.get('css').all;
		let selector = null;
		let content = null;

		beforeEach(() => {
			atom.packages.activatePackage('emoji-syntax');
			content = EmojiStyleSheet.getContent();
			selector = EmojiStyleSheet.createSelector({
				language: css.languageSelector,
				emoji: css['@import'].emoji,
				selector: css['@import'].selector,
				pseudo: css['@import'].pseudo,
				spacing: css['@import'].spacing
			});
		});

		it('is a valid CSS selector', () => {
			expect(typeof selector === 'string').toBe(true);
		});

		it('creates correct content', () => {
			expect(typeof content === 'string').toBe(true);
		});
	});

	describe('Creates a valid <style> element', () => {
		const elementDefault = EmojiStyleSheet.createElement();
		const elementCustom = EmojiStyleSheet.createElement({
			context: 'different-context',
			priority: 'highest'
		});

		it('is a valid HTML element', () => {
			expect(elementDefault instanceof HTMLElement).toBe(true);
			expect(elementDefault.nodeName).toContain('STYLE');
			expect(elementCustom instanceof HTMLElement).toBe(true);
			expect(elementCustom.nodeName).toContain('STYLE');
		});

		it('has content', () => {
			expect(typeof elementDefault.textContent === 'string').toBe(true);
			expect(typeof elementCustom.textContent === 'string').toBe(true);
		});

		describe('Default and custom configuration', () => {
			it('has all default attributes', () => {
				expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true);
				expect(elementDefault.hasAttribute('context')).toBe(true);
				expect(elementDefault.getAttribute('context')).toContain('atom-text-editor');
				expect(elementDefault.hasAttribute('priority')).toBe(true);
				expect(elementDefault.getAttribute('priority')).toContain('2');
			});

			it('has all custom attributes', () => {
				expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true);
				expect(elementCustom.hasAttribute('context')).toBe(true);
				expect(elementCustom.getAttribute('context')).toContain('different-context');
				expect(elementCustom.hasAttribute('priority')).toBe(true);
				expect(elementCustom.getAttribute('priority')).toContain('highest');
			});
		});
	});

	describe('Adds, removes, updates stylesheet', () => {
		beforeEach(() => {
			atom.packages.activatePackage('emoji-syntax');
		});

		it('should add stylesheet', () => {
			EmojiStyleSheet.add();
			expect(EmojiStyleSheet.exists()).toBe(true);
		});

		it('should remove stylesheet', () => {
			EmojiStyleSheet.remove();
			expect(EmojiStyleSheet.exists()).toBe(false);
		});

		it('should return element', () => {
			expect(EmojiStyleSheet.get().nodeName === 'STYLE').toBe(true);
		});
	});
});
