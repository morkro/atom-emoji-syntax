'use babel';

import EmojiStyleSheet from '../lib/stylesheet';

describe('Emoji Syntax', () => {
	let atomStylesElement = null;

	beforeEach(() => {
		atomStylesElement = atom.stylesElement;
		atom.packages.activatePackage('emoji-syntax');
	});

	describe('when the package is activated', () => {
		it('should add an <style> element to the DOM', () => {
			expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeDefined();
		});
	});

	describe('when the package is deactivated', () => {
		beforeEach(() => atom.packages.deactivatePackage('emoji-syntax'));

		it('should remove the <style> element from the DOM', () => {
			expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeNull();
		});
	});
});

describe('Create a valid <style> element', () => {
	let elementDefault = null;
	let elementCustom = null;

	beforeEach(() => {
		elementDefault = EmojiStyleSheet.createElement();
		elementCustom = EmojiStyleSheet.createElement({
			context: 'different-context',
			priority: 'highest'
		});
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

	describe('Default configuration', () => {
		it('has all default attributes', () => {
			expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true);
			expect(elementDefault.hasAttribute('context')).toBe(true);
			expect(elementDefault.getAttribute('context')).toContain('atom-text-editor');
			expect(elementDefault.hasAttribute('priority')).toBe(true);
			expect(elementDefault.getAttribute('priority')).toContain('2');
		});
	});

	describe('Custom configuration', () => {
		it('has all custom attributes', () => {
			expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true);
			expect(elementCustom.hasAttribute('context')).toBe(true);
			expect(elementCustom.getAttribute('context')).toContain('different-context');
			expect(elementCustom.hasAttribute('priority')).toBe(true);
			expect(elementCustom.getAttribute('priority')).toContain('highest');
		});
	});
});
