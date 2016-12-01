'use babel'

import { SettingsElement } from '../lib/custom-elements'
import EmojiSettings from '../lib/settings'

describe('<emojisyntax-settings>', () => {
	const $settings = new SettingsElement()

	beforeEach(() => atom.packages.activatePackage('emoji-syntax'))

	it('can be initialized', () => {
		$settings.initialize(new EmojiSettings({
			style: atom.config.get('emoji-syntax.emojiStyles')
		}))
	})
})
