'use babel'

/**
 * Creates an HTML template string and returns it.
 * @see Code taken from https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/
 * @param {String} template - The HTML string written in template strings
 * @return {String} result - The new string
 */
export default function HTML (template) {
	let result = template[0]

	for (let i = 1; i < arguments.length; i++) {
		const arg = String(arguments[i])
		result += arg.replace(/&/g, '&amp')
						.replace(/</g, '&lt')
						.replace(/>/g, '&gt')
		result += template[i]
	}

	return result
}
