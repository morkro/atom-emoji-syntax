'use babel'

/**
 * Returns an array of properties from an object.
 * @param {String} name - The property name
 * @param {Object} obj - The object to iterate over
 * @return {Array} properties - Array with all properties
 */
export default function getArrayOfProp (name, obj = {}) {
	const properties = []

	Object.keys(obj).forEach(item => {
		if (properties.indexOf(obj[item][name]) <= -1) {
			properties.push(obj[item][name])
		}
	})

	return properties
}
