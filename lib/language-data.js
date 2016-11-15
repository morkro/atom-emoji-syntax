'use babel'

// System
import ConfigStore from 'configstore'
// Defaults
import languages from './languages'
import { DEFAULT_SETTINGS_PATH } from './constants/config'

const languageData = {}

/**
 * Returns the filename for a settings file.
 * @param  {String} languageName - The filename
 * @return {String}
 */
function getSettingsFileName (languageName) {
	return `${DEFAULT_SETTINGS_PATH}-${languageName.toLowerCase()}`
}

/**
 * Sets the `ConfigStore` for each language.
 * @return {undefined}
 */
export function setLanguageStore () {
	Object.keys(languages).forEach((key) => {
		const { name, userSettings, internalSettings } = languages[key]

		languageData[key] = {
			name,
			internalSettings,
			userSettings: new ConfigStore(getSettingsFileName(name), userSettings)
		}
	})
}

/**
 * Clears all stored language configuration.
 * @return {undefined}
 */
export function clearLanguageStore () {
	Object.keys(languageData).forEach((lang) => languageData[lang].userSettings.clear())
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
	const collection =
		Object.keys(languageData).map(lang => languageData[lang])

	if (filtered) {
		return collection.filter(item => item.userSettings.all.active)
	}

	return collection
}
