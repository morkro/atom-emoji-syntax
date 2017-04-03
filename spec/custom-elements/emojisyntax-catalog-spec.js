'use babel'
/* eslint-env jasmine */

import { CatalogElement } from '../../lib/custom-elements'

describe('<emojisyntax-catalog>', () => {
  beforeEach(() => {
    atom.packages.activatePackage('emoji-syntax')
  })

  afterEach(() => {
    atom.packages.deactivatePackage('emoji-syntax')
  })

  const $catalog = new CatalogElement()

  it('has all default properties', () => {
    expect($catalog).toBeDefined()
    expect(typeof $catalog.emojiList === 'object').toBe(true)
  })

  it('is possible to add custom attribute', () => {
    $catalog.setEmojiStyles('Emoji One')
    expect($catalog.hasAttribute('emoji-style')).toBe(true)
    expect($catalog.getAttribute('emoji-style')).toEqual('emoji-one')
  })
})
