'use babel'

/**
 * Tests if a string is a valid emoji
 * @see https://mathiasbynens.be/notes/javascript-unicode
 * @param {String} string - Hopefully it's an emoji
 * @return {Boolean}
 */
export default function isEmoji (string) {
	return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(string)
}
