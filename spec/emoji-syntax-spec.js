'use babel'

describe('Emoji Syntax', () => {
	const atomStylesElement = atom.stylesElement

	beforeEach(() => {
		atom.packages.activatePackage('emoji-syntax')
	})

	afterEach(() => {
		atom.packages.deactivatePackage('emoji-syntax')
	})

	describe('when the package is activated', () => {
		it('should add an <style> element to the DOM', () => {
			expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeDefined()
		})
	})

	describe('when the package is deactivated', () => {
		beforeEach(() => atom.packages.deactivatePackage('emoji-syntax'))

		it('should remove the <style> element from the DOM', () => {
			expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeNull()
		})
	})
})
