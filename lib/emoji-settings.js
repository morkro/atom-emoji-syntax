'use babel';

import { getAllLanguages } from './helpers/get-all-languages';

class EmojiSettings {
	constructor (config = {}) {
		this.style = config.style;
		this.attr = this.normalize(this.style);
		this.languages = getAllLanguages(true);
	}

	/**
	 * Updates internal data.
	 * @param  {String} value
	 */
	update (value) {
		this.style = value;
		this.attr = this.normalize(value);
	}

	/**
	 * Turns a string into a normalized string for DOM usage.
	 * @param  {String} string
	 * @return {String}
	 */
	normalize (string) {
		return string.replace(/\s/g, '-').toLowerCase();
	}

	/**
	 * Returns a fresh copy of the class.
	 * @param  {Object} config
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
