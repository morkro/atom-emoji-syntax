'use babel'
/* eslint-env jasmine */

describe('Emoji Syntax', () => {
  const atomStylesElement = atom.stylesElement

  beforeEach(() => {
    atom.packages.activatePackage('emoji-syntax')
  })

  afterEach(() => {
    atom.packages.deactivatePackage('emoji-syntax')
  })

  it('when the package is activated, should add an <style> element to the DOM', () => {
    expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeDefined()
  })

  it('when the package is deactivated, should remove the <style> element from the DOM', () => {
    expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeNull()
  })
})
