/** @babel */

/**
 * Tests if a string is a valid emoji
 * @alias isEmoji
 * @param {String} string - Hopefully it's an emoji
 * @return {Boolean}
 * @see https://mathiasbynens.be/notes/javascript-unicode
 */
export default function isEmoji (string) {
  return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(string)
}
