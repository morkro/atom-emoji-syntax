/** @babel */

import fs from 'fs'
import ConfigStore from 'configstore'
import { DEFAULT_SETTINGS_PATH } from './constants'
import languageSettings from './languages'

const languageStore = {}

/**
 * This function takes an old settings config object and deletes elements
 * which are not required anymore.
 * @param  {Object} settings
 * @return {Object}
 */
function cleanOldSettings (settings = {}) {
  const cleanedSettings = settings

  delete cleanedSettings.languageName
  delete cleanedSettings.languageSelector

  Object.keys(cleanedSettings).forEach(keyword => {
    if (!cleanedSettings[keyword].selector) {
      return
    }
    delete cleanedSettings[keyword].selector
  })

  return cleanedSettings
}

/**
 * Saves the language settings internally, checks if previous settings
 * are available, copies them, and eventually deletes the file.
 * @param  {Object} lang
 * @return {Promise}
 */
function createSettingsObject (lang) {
  return new Promise((resolve) => {
    const { name, internalSettings, userSettings } = languageSettings[lang]
    const filename = `${DEFAULT_SETTINGS_PATH}-${name.toLowerCase()}`

    languageStore[lang] = {
      name,
      internalSettings,
      userSettings: new ConfigStore(filename, userSettings)
    }

    // This is needed because I've updated the language settings logic.
    // I changed a couple of things, but don't want to leave the users without their
    // previous settings. So I check if there are any, copy them over, and eventually
    // delete the old settings file.
    // This approach also feels very ugly. Please send me a note, a PR, or anything to
    // help me improve this part.
    const settingsLocation = languageStore[lang].userSettings.path.replace(filename, name)

    fs.readFile(settingsLocation, 'utf8', (readError, data) => {
      if (readError) return resolve()

      languageStore[lang].userSettings.all = cleanOldSettings(JSON.parse(data))
      fs.unlink(settingsLocation)

      return resolve()
    })
  })
}

/**
 * Sets the `ConfigStore` for each language.
 * @return {Promise}
 */
export function setLanguageStore () {
  return Promise.all(Object.keys(languageSettings).map(createSettingsObject))
}

/**
 * Clears all stored language configuration.
 * @return {undefined}
 */
export function clearLanguageStore () {
  Object.keys(languageStore).forEach(lang =>
    languageStore[lang].userSettings.clear()
  )
}

/**
 * Returns the default settings of a language.
 * @param  {String} language
 * @return {Object}
 */
export function getDefaultSettings (language) {
  if (!language) {
    return
  }
  return languageSettings[language].userSettings
}

/**
 * Returns the respective language object
 * @param  {String} name - The language name
 * @return {Object}
 */
export function getLanguage (name) {
  if (!languageStore[name] || !name) {
    return
  }
  return languageStore[name]
}

/**
 * Takes the package config and returns all enabled languages as array.
 * @param {Boolean} filtered
 * @return {Array}
 */
export function getAllLanguages ({ filtered } = {}) {
  const collection = Object.keys(languageStore).map(lang => languageStore[lang])

  if (filtered) {
    return collection.filter(item => item.userSettings.all.active)
  }

  return collection
}
