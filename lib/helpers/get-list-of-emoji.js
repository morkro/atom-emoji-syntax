'use babel';

import { lib as emojilib } from 'emojilib';
import { isEmoji } from '../helpers/unicode';
import getArrayOfProp from '../helpers/get-array-of-props';

/**
 * Returns a sorted list of all emoji per category.
 *
 * @return {Object}
 * @example
 * {
 * 	people: ['😀', '😎', ...],
 * 	symbols: ['💯', '💝', ...],
 * 	[...]
 * }
 */
export default function getListOfEmoji () {
	const list = {};
	const categories = getArrayOfProp('category', emojilib);

	categories.splice(categories.indexOf('_custom'), 1);
	categories.forEach(category => {
		const group = [];

		Object.keys(emojilib).forEach(item => {
			const emoji = emojilib[item].char;
			if (emojilib[item].category === category && isEmoji(emoji)) {
				group.push(emoji);
			}
		});

		list[category] = group;
	});

	return list;
}
