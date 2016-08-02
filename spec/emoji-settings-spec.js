'use babel'

import SettingsElement from '../lib/custom-elements/emoji-settings'
import EmojiSettings from '../lib/emoji-settings'

describe('<emoji-settings>', () => {
	const config = atom.config.get('emoji-syntax.emojiStyles')
	const construct = new EmojiSettings({ style: config })
	const element = new SettingsElement()
	element.initialize(construct)
})
