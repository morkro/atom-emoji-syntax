'use babel';

// Helper
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
import { getLanguage } from '../helpers/get-all-languages';
// Package core
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
		this.appendChild(createNode('div', { className: 'emoji-options' }));
		this.optionsWrap = this.querySelector('.emoji-options');
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
				data-emoji-position="before">Before</button>
				<button
				class="btn ${isAfterSelected} emoji-toggle-position"
				data-emoji-position="after">After</button>
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
				<button data-emoji-option="spacing"
				class="${btnClasses} ${isSelected}"></button>
			`;
		}
		else {
			wrapper.innerHTML = HTML`
				<h3><code>${name}</code></h3>
				<button data-emoji-option="active"
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
					lang: this.getAttribute('data-emoji-language'),
					keyword: this.getAttribute('data-emoji-keyword'),
					property: target.getAttribute('data-emoji-option'),
					newValue: !!target.classList.contains('btn-primary')
				});
			}
			// User toggles emoji positioning
			else if (target.classList.contains('emoji-toggle-position')) {
				const position = target.getAttribute('data-emoji-position');

				if (position === 'before') {
					target.nextElementSibling.classList.remove('selected');
				}
				else if (position === 'after') {
					target.previousElementSibling.classList.remove('selected');
				}

				target.classList.add('selected');
				this.updateLanguage({
					lang: this.getAttribute('data-emoji-language'),
					keyword: this.getAttribute('data-emoji-keyword'),
					property: 'pseudo',
					newValue: position
				});
			}
			// User opens emoji list
			else if (target.classList.contains('emoji-open-list')) {
				const openListEvent = new CustomEvent('emoji-keyword:open-list', {
					detail: {
						current: this.querySelector('.emoji-open-list').textContent,
						language: this.getAttribute('data-emoji-language'),
						keyword: this.getAttribute('data-emoji-keyword')
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
		Object.keys(options.content).forEach(item => {
			if (item !== 'selector') {
				const name = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
				const content = options.content[item];
				let listItem = null;

				switch (item) {
				case 'emoji':
					listItem = this.createEmojiConfig(content);
					break;
				case 'pseudo':
					listItem = this.createPositionConfig(content);
					break;
				case 'spacing':
					listItem = this.createCheckboxConfig(name, content);
					break;
				case 'active':
					listItem = this.createCheckboxConfig(options.keyword, content);
					break;
				default:
					break;
				}

				if (listItem !== null) {
					this.optionsWrap.appendChild(listItem);
				}
			}
		});

		this.setAttribute('data-emoji-language', options.language.toLowerCase());
		this.setAttribute('data-emoji-keyword', options.keyword.toLowerCase());
		this.addEventListener('click', this.manageSettingsData);
		this.addEventListener('keydown', this.manageEmojiSettings);
		this.addEventListener('keyup', this.manageEmojiSettings);
	}
}

export default KeywordElement = document.registerElement('emoji-keyword',
	{ prototype: KeywordElement.prototype }
);
