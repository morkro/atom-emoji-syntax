'use babel';

/**
 * Tests if a string is a valid emoji
 *
 * @param {String} string - Hopefully it's an emoji
 * @return {Boolean}
 */
export function isEmoji (string) {
	return /([\uD800-\uDBFF][\uDC00-\uDFFF])/g.test(string);
}

/**
 * Returns the hexadecimal digits of a unicode character.
 *
 * @param {String} char
 * @return {String}
 * @example getHexadecimalUnicode('💩'); // '1f4a9'
 */
export function getHexadecimalUnicode (char) {
	return char.codePointAt(0).toString(16);
}
