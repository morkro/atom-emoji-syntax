'use babel';

class EmojiSettings {
	constructor (config) {
		this.data = config;
	}

	static deserialize (config) {
		return new EmojiSettings(config);
	}

	serialize () {
		return {
			data: this.data
		};
	}
}

atom.deserializers.add(EmojiSettings);

export default EmojiSettings;
