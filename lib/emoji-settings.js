'use babel'

// Core
import { Emitter } from 'event-kit'
// Helper
import { getLanguage } from './language-data'
// Package
import EmojiStyleSheet from './stylesheet'

/**
 * @class EmojiSettings
 * @param {String} style - Name of the current emoji set
 * @param {String} attr - Same as style but normalized
 * @param {Array} languages - All language objects in an array
 */
class EmojiSettings {
	constructor ({ style, attr = this.normalize(style) } = {}) {
		this.emitter = new Emitter()
		this.style = style
		this.attr = attr
		this.imagePath = this.getEmojiSourcePath()

		this.emitter.on('update-stylesheet', this.updateStylesheet)
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
	updateStylesheet (updateData = {}) {
		if (Object.keys(updateData).length) {
			const { lang, keyword, property, newValue } = updateData
			const language = getLanguage(lang)
			language.set(`${keyword}.${property}`, newValue)
		}

		EmojiStyleSheet.update()
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
