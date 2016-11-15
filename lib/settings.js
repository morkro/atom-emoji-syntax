'use babel'

// Core
import { Emitter } from 'event-kit'
// Package
import { getLanguage } from './language-data'
import { updateStyleSheet as updateSS } from './stylesheet'

/**
 * @class EmojiSettings
 * @param {String} style - Name of the current emoji set
 * @param {String} attr - Same as style but normalized
 */
class EmojiSettings {
	constructor ({ style, attr = this.normalize(style) } = {}) {
		this.emitter = new Emitter()
		this.style = style
		this.attr = attr
		this.imagePath = this.getEmojiSourcePath()

		this.emitter.on('update-stylesheet', this.updateStyleSheet)
	}

	/**
	 * Updates internal data.
	 * @param {String} value
	 * @return {undefined}
	 */
	update (value) {
		this.style = value
		this.attr = this.normalize(value)
		this.imagePath = this.getEmojiSourcePath()

		this.emitter.emit('emoji-settings:update', {
			style: this.style,
			attr: this.attr,
			path: this.imagePath
		})
	}

	/**
	 * Updates the stylesheet and emoji data.
	 * @param {Object} updateData
	 * @return {undefined}
	 */
	updateStyleSheet (updateData = {}) {
		if (Object.keys(updateData).length) {
			const { lang, keyword, property, newValue } = updateData
			const { userSettings } = getLanguage(lang)
			userSettings.set(`${keyword}.${property}`, newValue)
		}

		updateSS()
	}

	/**
	 * Returns the path to the respective image folder.
	 * @return {String}
	 */
	getEmojiSourcePath () {
		const path = atom.packages.resolvePackagePath('emoji-syntax')
		return `${path}/styles/${this.attr}`
	}

	/**
	 * Turns a string into a normalized string for DOM usage.
	 * @param {String} string
	 * @return {String}
	 */
	normalize (string) {
		return String(string).replace(/\s/g, '-').toLowerCase()
	}

	/**
	 * Returns a fresh copy of the class.
	 * @param {Object} config - Same configuration as in constructor
	 * @param {String} config.style - Name of the current emoji set
	 * @param {String} config.attr - Same as style but normalized
	 * @param {Array} config.languages - All language objects in an array
	 * @return {Object}
	 */
	static deserialize (config) {
		return new EmojiSettings({
			style: config.style,
			attr: config.attr
		})
	}

	/**
	 * Returns a serialised object of the class.
	 * @return {Object}
	 */
	serialize () {
		return {
			deserializer: 'EmojiSettings',
			style: this.style,
			attr: this.attr
		}
	}

	/**
	 * Disposes off event emitter.
	 * @return {undefined}
	 */
	dispose () {
		this.emitter.dispose()
	}
}

// Adding component to serialization system.
atom.deserializers.add(EmojiSettings)

export default EmojiSettings
