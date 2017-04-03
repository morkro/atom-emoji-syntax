'use babel'
/* eslint-env jasmine */

import { DirectoryElement } from '../../lib/custom-elements'

describe('<emojisyntax-directory>', () => {
  beforeEach(() => {
    atom.packages.activatePackage('emoji-syntax')
  })

  afterEach(() => {
    atom.packages.deactivatePackage('emoji-syntax')
  })

  const $directory = new DirectoryElement()

  it('it is an HTMLElement', () => {
    expect($directory).toBeInstanceOf(HTMLElement)
  })
})
