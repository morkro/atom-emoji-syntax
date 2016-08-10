'use babel'

import { SettingsElement } from '../lib/custom-elements'
import EmojiSettings from '../lib/settings'

describe('<emoji-settings>', () => {
	const config = atom.config.get('emoji-syntax.emojiStyles')
	const construct = new EmojiSettings({ style: config })
	const element = new SettingsElement()
	element.initialize(construct)
})
