/** @babel */

/**
 * Returns a new language object with all (default or package) settings.
 * @param  {Object} config - A language settings object
 * @param  {String} settingsType - Can either be `userSettings` or `internalSettings`
 * @return {Object}
 */
export default function getLanguageSettings (config = {}, settingsType) {
  const settings = {}
  Object.keys(config).forEach(key => {
    settings[key] = config[key][settingsType]
  })
  return settings
}
