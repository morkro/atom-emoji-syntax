'use babel'
/* eslint-env jasmine */

import { SettingsElement } from '../../lib/custom-elements'
import EmojiSettings from '../../lib/settings'

describe('<emojisyntax-settings>', () => {
  beforeEach(() => {
    atom.packages.activatePackage('emoji-syntax')
  })

  afterEach(() => {
    atom.packages.deactivatePackage('emoji-syntax')
  })

  it('can be initialized', () => {
    const $settings = new SettingsElement()
    $settings.initialize(new EmojiSettings({
      style: atom.config.get('emoji-syntax.emojiStyles')
    }))
  })
})
