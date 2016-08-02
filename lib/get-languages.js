'use babel'

// System
import ConfigStore from 'configstore'
// Defaults
import lang from './languages'

const javascript = Symbol('configJS')
const typescript = Symbol('configTS')
const python = Symbol('configPy')
const scss = Symbol('configSCSS')
const css = Symbol('configCSS')
const php = Symbol('configPHP')

const languages = {
	[javascript]: new ConfigStore(lang.javascript.languageName, lang.javascript),
	[typescript]: new ConfigStore(lang.typescript.languageName, lang.typescript),
	[python]: new ConfigStore(lang.python.languageName, lang.python),
	[scss]: new ConfigStore(lang.scss.languageName, lang.scss),
	[css]: new ConfigStore(lang.css.languageName, lang.css),
	[php]: new ConfigStore(lang.php.languageName, lang.php),

	/**
	 * Returns the respective language object
	 * @param  {String} name - The language name
	 * @return {Object}
	 */
	get (name) {
		switch (name) {
		case 'javascript': return this[javascript]
		case 'typescript': return this[typescript]
		case 'python': return this[python]
		case 'scss': return this[scss]
		case 'css': return this[css]
		case 'php': return this[php]
		default: return
		}
	},

	/**
	 * Takes the package config and returns all enabled languages as array.
	 * @param {Object} options
	 * @param {Boolean} options.filtered
	 * @return {Array}
	 */
	getAll (options = {}) {
		let collection = [
			this[javascript].all,
			this[typescript].all,
			this[python].all,
			this[scss].all,
			this[css].all,
			this[php].all
		]

		if (options.filtered) {
			collection = collection.filter(item => item.active)
		}

		return collection
	}
}

export default languages
