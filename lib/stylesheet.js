'use babel';

import createSelector from './helpers/create-selector';
import { getAllLanguages } from './helpers/get-all-languages';

const selector = Symbol('selector');
const styleSheet = Symbol('stylesheet');

const EmojiStyleSheet = {
	[selector]: 'emoji-syntax-stylesheet',
	[styleSheet]: null,

	/**
	 * Creates a <style> element based on Atom's "atom.styles.addStyleSheet()".
	 *
	 * @param {String} source - The stylesheet's content
	 * @param {String} context - Content for custom attribute "content"
	 * @param {(Number|String)} priority - Content for custom attribute
	 *
	 * @return {Object} styleSheet - The <style> element
	 */
	createElement ({
		content = this.getContent(),
		context = 'atom-text-editor',
		priority = 2
	} = {}) {
		const element = document.createElement('style');

		element.textContent = content;
		element.classList.add(this[selector]);
		element.context = context;
		element.setAttribute('context', context);
		element.priority = priority;
		element.setAttribute('priority', priority);

		return element;
	},

	/**
	 * Loops over a language object and creates the respective stylesheet.
	 * @return {String} stylesheet - The stylesheet as string
	 */
	getContent () {
		const languages = getAllLanguages();
		let content = '';

		languages.forEach(lang => {
			const { languageSelector } = lang;

			Object.keys(lang).forEach(item => {
				if (lang[item].active && lang[item].emoji) {
					content += createSelector(languageSelector, {
						emoji: lang[item].emoji,
						selector: lang[item].selector,
						pseudo: lang[item].pseudo,
						spacing: lang[item].spacing
					});
				}
			});
		});

		return content;
	},

	/**
	 * Checks package configuration if native emoji style is chosen.
	 * @return {Boolean}
	 */
	isNative () {
		const { emojiStyles } = atom.config.get('emoji-syntax');

		if (emojiStyles === 'Native') {
			return true;
		}

		return false;
	},

	/**
	 * Checks if the stylesheet is available in <atom-styles>
	 * @return {Boolean}
	 */
	exists () {
		return !!atom.stylesElement.querySelector(`.${this[selector]}`);
	},

	/**
	 * Removes the stylesheet element from <atom-styles>
	 * @return {undefined}
	 */
	remove () {
		if (this.exists()) {
			atom.styles.removeStyleElement(this[styleSheet]);
			return true;
		}
		return false;
	},

	/**
	 * Adds the stylesheet element to <atom-styles>
	 * @return {Boolean} True if successful, false if not
	 */
	add () {
		if (!this.exists()) {
			this.set();
			atom.styles.addStyleElement(this[styleSheet]);
			return true;
		}
		return false;
	},

	/**
	 * Removes, creates a new stylesheet and adds it again.
	 * @return {undefined}
	 */
	update () {
		this.remove();
		this.set();
		this.add();
	},

	/**
	 * Assings the <style> element.
	 * @return {undefined}
	 */
	set () {
		this[styleSheet] = this.createElement({ content: this.getContent() });
	},

	/**
	 * Returns the <style> element
	 * @return {Object|null} styleSheet - The <style> element
	 */
	get () {
		return this[styleSheet];
	}
};

export default EmojiStyleSheet;
