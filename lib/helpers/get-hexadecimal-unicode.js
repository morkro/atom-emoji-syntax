/** @babel */

/**
 * Returns the hexadecimal digits of a unicode character.
 * @alias getHexadecimalUnicode
 * @param {String} char
 * @return {String}
 * @example
 * getHexadecimalUnicode('💩') // '1f4a9'
 * getHexadecimalUnicode('🇩🇪') // '1f1e9-1f1ea'
 * @see https://mathiasbynens.be/notes/javascript-unicode
 */
export default function getHexadecimalUnicode (char) {
  if (!char) return
  const points = []

  for (const symbol of char) {
    points.push(symbol.codePointAt(0).toString(16))
  }

  return points.join('-')
}
