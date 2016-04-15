'use babel';

// Helper
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
import isEmoji from '../helpers/is-emoji';
import { getLanguage } from '../helpers/get-all-languages';
// Package core
import { updateStyleSheet } from '../stylesheet';

class EmojiKeywordView extends HTMLElement {
	createdCallback () {
		this.innerHTML = HTML`
			<h3><code></code></h3>
			<div class="emoji-options"></div>
		`;

		this.keywordName = this.querySelector('h3 code');
		this.optionsWrap = this.querySelector('.emoji-options');
	}

	createInputOption (name, value) {
		const wrapper = createNode('div', {
			className: ['block', 'option-emoji']
		});

		wrapper.innerHTML = HTML`
			<div>${name}:</div><atom-text-editor mini class="inline-block">${value}</atom-text-editor>
		`;

		return wrapper;
	}

	createPseudoOption (name, value) {
		const wrapper = createNode('div', {
			className: ['block', 'option-pseudo']
		});
		const isBeforeSelected = (value === 'before') ? 'selected' : '';
		const isAfterSelected = (value !== 'before') ? 'selected' : '';

		wrapper.innerHTML = HTML`
			<div>${name}:</div>
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

	createCheckboxOption (name, value) {
		const wrapper = createNode('div', { className: 'block' });
		const isSelected = (value === true) ? 'btn-primary' : '';

		if (name !== 'Active') {
			wrapper.classList.add('option-spacing');
			wrapper.innerHTML = HTML`
				<div>${name}:</div>
				<button data-emoji-option="spacing"
				class="emoji-toggle-active btn btn-sm ${isSelected} icon icon-check"></button>
			`;
		}
		else {
			wrapper.classList.add('option-activate');
			wrapper.innerHTML = HTML`
				<button data-emoji-option="active"
				class="emoji-toggle-active btn btn-sm ${isSelected} icon icon-check"></button>
			`;
		}

		return wrapper;
	}

	manageSettingsData (event) {
		const target = event.target;
		const isElement = target instanceof HTMLElement;

		if (isElement && target.classList.contains('emoji-toggle-active')) {
			target.classList.toggle('btn-primary');

			this.updateLanguage({
				lang: this.getAttribute('data-emoji-language'),
				keyword: this.getAttribute('data-emoji-keyword'),
				property: target.getAttribute('data-emoji-option'),
				newValue: !!target.classList.contains('btn-primary')
			});
		}
		else if (isElement && target.classList.contains('emoji-toggle-position')) {
			if (target.getAttribute('data-emoji-position') === 'before') {
				target.nextElementSibling.classList.remove('selected');
			}
			else if (target.getAttribute('data-emoji-position') === 'after') {
				target.previousElementSibling.classList.remove('selected');
			}
			target.classList.add('selected');

			this.updateLanguage({
				lang: this.getAttribute('data-emoji-language'),
				keyword: this.getAttribute('data-emoji-keyword'),
				property: 'pseudo',
				newValue: target.getAttribute('data-emoji-position')
			});
		}
	}

	manageEmojiSettings (event) {
		const strictEmojiMode = atom.config.get('emoji-syntax').strictEmojiMode;
		const target = event.target;
		let editor = null;

		if (target.nodeName === 'ATOM-TEXT-EDITOR') {
			editor = target.getModel();

			if (
				event.type === 'keyup' &&
				strictEmojiMode &&
				!isEmoji(editor.getText())
			) {
				target.classList.add('is-error');
			}
			else {
				target.classList.remove('is-error');
				this.updateLanguage({
					lang: this.getAttribute('data-emoji-language'),
					keyword: this.getAttribute('data-emoji-keyword'),
					property: 'emoji',
					newValue: editor.getText()
				});
			}
		}
	}

	updateLanguage (options = {}) {
		const language = getLanguage(options.lang);
		language.set(`${options.keyword}.${options.property}`, options.newValue);
		updateStyleSheet();
	}

	initialize (options = {}) {
		Object.keys(options.content).forEach(item => {
			const optionsName = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
			let listItem = null;

			if (item === 'emoji') {
				listItem = this.createInputOption(optionsName, options.content[item]);
			}
			else if (item === 'pseudo') {
				listItem = this.createPseudoOption(optionsName, options.content[item]);
			}
			else if (item === 'active' || item === 'spacing') {
				listItem = this.createCheckboxOption(optionsName, options.content[item]);
			}

			if (item !== 'selector' && listItem !== null) {
				this.optionsWrap.appendChild(listItem);
			}
		});

		this.keywordName.innerHTML = options.keyword.toLowerCase();
		this.setAttribute('data-emoji-language', options.language.toLowerCase());
		this.setAttribute('data-emoji-keyword', options.keyword.toLowerCase());
		this.addEventListener('click', this.manageSettingsData);
		this.addEventListener('keydown', this.manageEmojiSettings);
		this.addEventListener('keyup', this.manageEmojiSettings);
	}
}

export default EmojiKeywordView = document.registerElement('emoji-keyword',
	{ prototype: EmojiKeywordView.prototype }
);
