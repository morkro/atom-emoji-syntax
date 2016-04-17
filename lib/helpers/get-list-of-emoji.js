'use babel';

import { lib as emojis } from 'emojilib';
import isEmoji from '../helpers/is-emoji';
import getArrayOfProp from '../helpers/get-array-of-props';

/**
 * Returns a sorted list of all emoji per category.
 * @return  {Object}
 * @example { people: ['😀', '😎', ...], symbols: ['💯', '💝', ...], ... }
 */
export default function getListOfEmoji () {
	const list = {};
	const categories = getArrayOfProp('category', emojis);

	categories.splice(categories.indexOf('_custom'), 1);
	categories.forEach(category => {
		const group = [];

		Object.keys(emojis).forEach(item => {
			const emoji = emojis[item].char;
			if (emojis[item].category === category && isEmoji(emoji)) {
				group.push(emoji);
			}
		});

		list[category] = group;
	});

	return list;
}
