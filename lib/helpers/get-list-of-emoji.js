'use babel'

import { lib as emojilib } from 'emojilib'
import { isEmoji, getHexadecimalUnicode } from '../helpers/unicode'
import getArrayOfProp from '../helpers/get-array-of-props'

/**
 * Returns a sorted list of all emoji and
 * the respective hexadecimal unicode per category.
 * @return {Object}
 * @example
 * {
 * 	people: [['😀', '1f600'], ['😎', '1f60e'], ...],
 * 	symbols: [['💯', '1f4af'], ['💝', '1f49d'], ...],
 * 	[...]
 * }
 */
export default function getListOfEmoji () {
	const list = {}
	const categories = getArrayOfProp('category', emojilib)

	categories.splice(categories.indexOf('_custom'), 1)
	categories.forEach(category => {
		const group = []

		Object.keys(emojilib).forEach(item => {
			const emoji = emojilib[item].char
			if (emojilib[item].category === category && isEmoji(emoji)) {
				group.push([emoji, getHexadecimalUnicode(emoji)])
			}
		})

		list[category] = group
	})

	return list
}
