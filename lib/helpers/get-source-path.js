'use babel';

import { getHexadecimalUnicode } from './unicode';

/**
 * Returns the correct path to emoji source folder.
 *
 * @param {String} iconSet - The name of the folder
 * @param {String} emoji
 * @param {String} unicode - Unicode character of the emoji
 *
 * @return {String}
 */
export default function getImageSourcePath ({
	folderName = atom.config.get('emoji-syntax.emojiStyles'),
	emoji,
	unicode = getHexadecimalUnicode(emoji)
} = {}) {
	if (!emoji) return;
	const folder = folderName.replace(/\s/g, '-').toLowerCase();
	const path = atom.packages.resolvePackagePath('emoji-syntax');
	return `${path}/styles/${folder}/${unicode}.svg`;
}
