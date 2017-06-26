/** @babel */

import { lib } from 'emojilib'
import isEmoji from './is-emoji'
import getHexadecimalUnicode from './get-hexadecimal-unicode'
import getArrayOfProp from './get-array-of-prop'

/**
 * Returns a sorted list of all emoji and
 * the respective hexadecimal unicode per category.
 * @alias getListOfEmoji
 * @return {Object}
 * @example
 * {
 *   people: [['😀', '1f600'], ['😎', '1f60e'], ...],
 *   symbols: [['💯', '1f4af'], ['💝', '1f49d'], ...],
 *   [...]
 * }
 */
export default () => {
  const list = {}
  const categories = getArrayOfProp('category', lib)

  categories.splice(categories.indexOf('_custom'), 1)
  categories.forEach(cat => {
    list[cat] = Object.keys(lib)
      .filter(i => lib[i].category === cat && isEmoji(lib[i].char))
      .map(i => [lib[i].char, getHexadecimalUnicode(lib[i].char)])
  })

  return list
}
