'use babel';

import { getAllLanguages } from './helpers/get-all-languages';

/**
 * @class EmojiSettings
 * @param {Object} config
 * @param {String} config.style - Name of the current emoji set
 * @param {String} config.attr - Same as style but normalized
 * @param {Array} config.languages - All language objects in an array
 */
class EmojiSettings {
	constructor (config = {}) {
		this.style = config.style;
		this.attr = config.attr || this.normalize(this.style);
		this.languages = config.languages || getAllLanguages(true);
	}

	/**
	 * Updates internal data.
	 * @param {String} value
	 */
	update (value) {
		this.style = value;
		this.attr = this.normalize(value);
	}

	/**
	 * Turns a string into a normalized string for DOM usage.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	normalize (string) {
		return String(string).replace(/\s/g, '-').toLowerCase();
	}

	/**
	 * Returns a fresh copy of the class.
	 *
	 * @param {Object} config - Same configuration as in constructor
	 * @param {String} config.style - Name of the current emoji set
	 * @param {String} config.attr - Same as style but normalized
	 * @param {Array} config.languages - All language objects in an array
	 *
	 * @return {Object}
	 */
	static deserialize (config) {
		return new EmojiSettings({
			style: config.style,
			attr: config.attr,
			languages: config.languages
		});
	}

	/**
	 * Returns a serialised object of the class.
	 * @return {Object}
	 */
	serialize () {
		return {
			deserializer: 'EmojiSettings',
			style: this.style,
			attr: this.attr,
			languages: this.languages
		};
	}
}

// Adding component to serialization system.
atom.deserializers.add(EmojiSettings);

export default EmojiSettings;
