'use babel'

// System
import ConfigStore from 'configstore'
// Defaults
import languages from './languages'

const languageData = {}

/**
 * Updates a single keyword's selector.
 * @param {String} lang - The language name
 * @param {String} keyword - The keyword to update
 * @return {undefined|Boolean}
 */
function updateLanguageSelector (lang, keyword) {
	if (!languageData[lang]) {
		return
	}

	return languageData[lang].set(
		'function.selector',
		languages[lang][keyword].selector
	)
}

/**
 * Sets the `ConfigStore` for each language.
 * @return {undefined}
 */
export function setLanguageStore () {
	Object.keys(languages).forEach((key) => {
		const lang = languages[key]
		languageData[key] = new ConfigStore(lang.languageName, lang)
	})

	/**
	 * Force package to update new selector config.
	 * @todo Remove this in next release.
	 */
	updateLanguageSelector('javascript', 'function')
}

/**
 * Clears all stored language configuration.
 * @return {undefined}
 */
export function clearLanguageStore () {
	Object.keys(languageData)
		.forEach((lang) => languageData[lang].clear())
}

/**
 * Returns the respective language object
 * @param  {String} name - The language name
 * @return {Object}
 */
export function getLanguage (name) {
	if (!languageData[name] || !name) {
		return
	}
	return languageData[name]
}

/**
 * Takes the package config and returns all enabled languages as array.
 * @param {Boolean} filtered
 * @return {Array}
 */
export function getAllLanguages ({ filtered } = {}) {
	let collection = [...Object.keys(languageData)
		.map(lang => languageData[lang].all)
	]

	if (filtered) {
		collection = collection.filter(item => item.active)
	}

	return collection
}
