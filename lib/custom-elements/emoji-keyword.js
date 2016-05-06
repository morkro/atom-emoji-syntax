'use babel';

// Helper
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
import { getLanguage } from '../helpers/get-all-languages';
import { getHexadecimalUnicode } from '../helpers/unicode';
// Package
import EmojiStyleSheet from '../stylesheet';

/**
 * =========================================================================== *
 *                     🔮 THE <emoji-keyword> ELEMENT 🔮
 * =========================================================================== *
 *
 * @class KeywordElement
 * @extends HTMLElement
 */
class KeywordElement extends HTMLElement {
	createdCallback () {
		this.optionsWrap = createNode('div', { className: 'emoji-options' });
		this.appendChild(this.optionsWrap);
	}

	/**
	 * Creates the emoji configuration markup.
	 *
	 * @param {String} value - The emoji character
	 * @return {HTMLElement}
	 */
	createEmojiConfig (value) {
		const wrapper = createNode('div', {
			className: ['block', 'option-emoji']
		});

		wrapper.setAttribute('data-emoji', value);
		wrapper.setAttribute('data-unicode', getHexadecimalUnicode(value));
		wrapper.innerHTML = HTML`
			<div>Emoji:</div>
			<span class="emoji-open-list badge icon icon-gear">${value}</span>
		`;

		return wrapper;
	}

	/**
	 * Creates the position configuration markup.
	 *
	 * @param {String} value - The pseudo attribute
	 * @return {HTMLElement}
	 */
	createPositionConfig (value) {
		const wrapper = createNode('div', {
			className: ['block', 'option-pseudo']
		});
		const isBeforeSelected = (value === 'before') ? 'selected' : '';
		const isAfterSelected = (value !== 'before') ? 'selected' : '';

		wrapper.innerHTML = HTML`
			<div>Position:</div>
			<div class="btn-group">
				<button
				class="btn ${isBeforeSelected} emoji-toggle-position"
				data-position="before">Before</button>
				<button
				class="btn ${isAfterSelected} emoji-toggle-position"
				data-position="after">After</button>
			</div>
		`;

		return wrapper;
	}

	/**
	 * Creates the checkbox configuration markup for spacing and keyword state.
	 *
	 * @param {String} name - The name of the checkbox config
	 * @param {String} value - Value if button is selected or not
	 *
	 * @return {HTMLElement}
	 */
	createCheckboxConfig (name, value) {
		const wrapper = createNode('div', { className: 'block' });
		const isSelected = (value === true) ? 'btn-primary' : '';
		const isSpacing = (name === 'Spacing');
		const btnClasses = 'emoji-toggle-active btn btn-sm icon icon-check';

		wrapper.classList.add(`option-${(isSpacing) ? 'spacing' : 'activate'}`);

		if (isSpacing) {
			wrapper.innerHTML = HTML`
				<div>${name}:</div>
				<button data-option="spacing"
				class="${btnClasses} ${isSelected}"></button>
			`;
		}
		else {
			wrapper.innerHTML = HTML`
				<h3><code>${name}</code></h3>
				<button data-option="active"
				class="${btnClasses} ${isSelected}"></button>
			`;
		}

		return wrapper;
	}

	/**
	 * Updates the language settings, depending on what the user clicks.
	 * @param {Object} event
	 */
	manageSettingsData (event) {
		const { target } = event;
		const isElement = target instanceof HTMLElement;

		if (isElement) {
			// User toggles keyword state
			if (target.classList.contains('emoji-toggle-active')) {
				target.classList.toggle('btn-primary');
				this.updateLanguage({
					lang: this.getAttribute('data-language'),
					keyword: this.getAttribute('data-keyword'),
					property: target.getAttribute('data-option'),
					newValue: !!target.classList.contains('btn-primary')
				});
			}
			// User toggles emoji positioning
			else if (target.classList.contains('emoji-toggle-position')) {
				const position = target.getAttribute('data-position');

				if (position === 'before') {
					target.nextElementSibling.classList.remove('selected');
				}
				else if (position === 'after') {
					target.previousElementSibling.classList.remove('selected');
				}

				target.classList.add('selected');
				this.updateLanguage({
					lang: this.getAttribute('data-language'),
					keyword: this.getAttribute('data-keyword'),
					property: 'pseudo',
					newValue: position
				});
			}
			// User opens emoji list
			else if (target.classList.contains('emoji-open-list')) {
				const openListEvent = new CustomEvent('emoji-keyword:open-list', {
					detail: {
						current: this.querySelector('.emoji-open-list').textContent,
						language: this.getAttribute('data-language'),
						keyword: this.getAttribute('data-keyword')
					}
				});
				this.dispatchEvent(openListEvent);
			}
		}
	}

	/**
	 * Updates the a language selector and applies stylesheet.
	 * @param {Object} options
	 */
	updateLanguage (options = {}) {
		const language = getLanguage(options.lang);
		language.set(`${options.keyword}.${options.property}`, options.newValue);
		EmojiStyleSheet.update();
	}

	/**
	 * Updates the lanuage selector and content of ".option-emoji"
	 * with the new emoji.
	 *
	 * @param {Object} settings
	 * @param {String} settings.lang
	 * @param {String} settings.keyword
	 * @param {String} settings.emoji
	 */
	updateSettings (settings = {}) {
		const { lang, keyword, emoji } = settings;

		this.querySelector('.emoji-open-list').textContent = emoji;
		this.updateLanguage({
			lang,
			keyword,
			property: 'emoji',
			newValue: emoji
		});
	}

	/**
	 * Initialization method to start the custom element.
	 *
	 * @param {Object} options
	 * @param {Object} options.content
	 * @param {String} options.language
	 * @param {String} options.keyword
	 */
	initialize (options = {}) {
		const { language, keyword, content } = options;
		const { emoji, pseudo, spacing, active } = content;
		const wrapper = this.optionsWrap;

		wrapper.appendChild(this.createCheckboxConfig(keyword, active));
		wrapper.appendChild(this.createEmojiConfig(emoji));
		wrapper.appendChild(this.createPositionConfig(pseudo));
		wrapper.appendChild(this.createCheckboxConfig('Spacing', spacing));

		this.setAttribute('data-language', language.toLowerCase());
		this.setAttribute('data-keyword', keyword.toLowerCase());
		this.addEventListener('click', this.manageSettingsData);
	}
}

export default KeywordElement = document.registerElement('emoji-keyword',
	{ prototype: KeywordElement.prototype }
);
