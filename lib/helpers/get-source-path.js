/** @babel */

import getHexadecimalUnicode from './get-hexadecimal-unicode'

/**
 * Returns the correct path to emoji source folder.
 * @alias getImageSourcePath
 * @param {String} iconSet - The name of the folder
 * @param {String} emoji
 * @param {String} unicode - Unicode character of the emoji
 * @return {String}
 */
export default ({
  folderName = atom.config.get('emoji-syntax.emojiStyles'),
  emoji,
  unicode = getHexadecimalUnicode(emoji)
} = {}) => {
  if (!emoji || !folderName || folderName === 'Native') return
  const folder = folderName.replace(/\s/g, '-').toLowerCase()
  return `atom://emoji-syntax/styles/${folder}/${unicode}.svg`
}
