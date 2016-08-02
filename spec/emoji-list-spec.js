'use babel'

import ListElement from '../lib/custom-elements/emoji-list'

describe('<emoji-list>', () => {
	const element = new ListElement()

	it('has all default properties', () => {
		expect(element).toBeDefined()
		expect(typeof element.emojiList === 'object').toBe(true)
	})

	it('is possible to add custom attribute', () => {
		element.setEmojiStyles('Emoji One')
		expect(element.hasAttribute('emoji-style')).toBe(true)
		expect(element.getAttribute('emoji-style')).toEqual('emoji-one')
	})
})
