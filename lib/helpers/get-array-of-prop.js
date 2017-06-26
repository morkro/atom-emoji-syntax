/** @babel */

/**
 * Returns an array of properties from an object.
 * @alias getArrayOfProp
 * @param {String} name - The property name
 * @param {Object} obj - The object to iterate over
 * @return {Array} properties - Array with all properties
 */
export default (name, obj = {}) => {
  const properties = Object.keys(obj).map(key => obj[key][name])
  return [...new Set(properties)]
}
