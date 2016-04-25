'use babel';

import { getAllLanguages } from './helpers/get-all-languages';

class EmojiSettings {
	constructor (config = {}) {
		this.style = config.style;
		this.languages = getAllLanguages(true);
	}

	/**
	 * Returns a fresh copy of the class.
	 * @param  {Object} config
	 * @return {Object}
	 */
	static deserialize (config) {
		return new EmojiSettings({
			style: config.style,
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
			languages: this.languages
		};
	}
}

// Adding component to serialization system.
atom.deserializers.add(EmojiSettings);

export default EmojiSettings;
