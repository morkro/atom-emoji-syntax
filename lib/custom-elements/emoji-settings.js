'use babel';

// System
import { CompositeDisposable } from 'atom';
// Helpers
import { getLanguage } from '../helpers/get-all-languages';
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
// Package core
import ListElement from './emoji-list';
import KeywordElement from './emoji-keyword';
import EmojiStyleSheet from '../stylesheet';

/**
 * =========================================================================== *
 *                     🔮 THE <emoji-settings> ELEMENT 🔮
 * =========================================================================== *
 *
 * @class SettingsElement
 * @extends HTMLElement
 */
class SettingsElement extends HTMLElement {
	createdCallback () {
		this.subscriptions = null;
		this.languages = null;
		this.emojiStyle = null;
		this.viewTitle = 'Emoji Syntax: Settings';
		this.iconName = 'emoji-syntax';
		this.emojiList = new ListElement();
		this.activeKeyword = { language: null, keyword: null };
		this.overlay = createNode('div', { className: 'settings-overlay' });
	}

	detachedCallback () {
		this.subscriptions.dispose();
	}

	/**
	 * Creates the header area of the settings page.
	 * @return {HTMLElement}
	 */
	createHeader () {
		const header = createNode('header', {
			className: 'emoji-settings-header'
		});
		const title = createNode('h1', {
			textContent: `${this.viewTitle} 🔧`
		});
		const toggleLanguages = createNode('button', {
			className: ['btn', 'toggle-languages'],
			textContent: 'Toggle all languages'
		});

		header.appendChild(title);
		header.appendChild(toggleLanguages);
		header.addEventListener('click', this.toggleColumns);

		return header;
	}

	/**
	 * Creates a panel element with all keywords.
	 *
	 * @param {Object} data
	 * @param {Boolean} data.active
	 * @param {String} data.languageName
	 *
	 * @return {HTMLElement}
	 */
	createSettingsPanel (data = {}) {
		const activeButton = (data.active) ? 'btn-primary selected' : '';
		const wrapper = createNode('atom-panel', {
			className: ['top', 'inset-panel'],
			attributes: { 'data-emoji-language': data.languageName.toLowerCase() }
		});

		wrapper.innerHTML = HTML`
			<div class="panel-heading">
				<div class="panel-group">
					<button class="btn-toggle-language btn btn-sm icon icon-check ${activeButton}"></button>
					<h2 class="inline-block">${data.languageName}</h2>
				</div>
			</div>
			<div class="panel-body"></div>
		`;

		if (!data.active) {
			wrapper.classList.add('is-inactive', 'is-collapsed');
		}

		wrapper.querySelector('.panel-heading')
			.addEventListener('click', this.managePanelItem);

		Object.keys(data).forEach(lang => {
			if (data[lang].emoji) {
				const keyword = new KeywordElement();

				keyword.initialize({
					language: data.languageName,
					selector: data.languageSelector,
					keyword: lang,
					content: data[lang]
				});

				keyword.addEventListener(
					'emoji-keyword:open-list',
					this.openListView.bind(this)
				);

				// Grab dat .panel-body
				return wrapper.children[1].appendChild(keyword);
			}
		});

		return wrapper;
	}

	/**
	 * Updates internal data, adds a class to itself and
	 * updates the <emoji-list> element.
	 * @param {Object} event
	 */
	openListView (event) {
		const { details } = event;

		this.activeKeyword.language = details.language;
		this.activeKeyword.keyword = details.keyword;
		this.emojiList.setCurrent(details.current);
		this.classList.toggle('emoji-overlay');
	}

	/**
	 * Activates/deactivates a panel.
	 * @param {Object} event
	 */
	managePanelItem (event) {
		const { target } = event;
		const isElement = target instanceof HTMLElement;
		const parent = this.parentNode;
		let language = null;

		if (isElement && target.nodeName === 'H2') {
			parent.classList.toggle('is-collapsed');
		}
		else if (isElement && target.classList.contains('btn-toggle-language')) {
			language = getLanguage(parent.getAttribute('data-emoji-language'));

			parent.classList.toggle('is-collapsed');
			parent.classList.toggle('is-inactive');
			target.classList.toggle('btn-primary');
			target.classList.toggle('selected');

			language.set('active', !!target.classList.contains('selected'));
			EmojiStyleSheet.update();
		}
	}

	/**
	 * Toggles all columns.
	 * @param {Object} event
	 */
	toggleColumns (event) {
		const panels = this.parentNode.querySelectorAll('atom-panel');

		if (event.target.classList.contains('toggle-languages')) {
			[...panels].forEach(item => {
				if (!item.classList.contains('is-collapsed')) {
					item.classList.add('is-collapsed');
				}
				else {
					item.classList.remove('is-collapsed');
				}
			});
		}
	}

	/**
	 * Resets internal data.
	 */
	resetActiveKeyword () {
		this.activeKeyword.language = null;
		this.activeKeyword.keyword = null;
	}

	/**
	 * Removes the ".emoji-overlay" class.
	 */
	closeEmojiList () {
		const parent = this.parentNode;
		if (parent.classList.contains('emoji-overlay')) {
			parent.classList.remove('emoji-overlay');
		}
	}

	/**
	 * Updates the emoji settings.
	 * @param {Object} event
	 */
	updateEmojiSettings (event) {
		const { emoji } = event.detail;
		const { language: lang, keyword } = this.activeKeyword;
		const keywordElement = this.querySelector(
			`[data-emoji-language="${lang}"][data-emoji-keyword="${keyword}"]`
		);

		keywordElement.updateSettings({ emoji, lang, keyword });
		this.classList.toggle('emoji-overlay');
		this.resetActiveKeyword();
	}

	onChangeEmojiStyle (data) {
		let { newValue } = data;
		newValue = newValue.replace(/\s/g, '-').toLowerCase();

		this.setAttribute('emoji-style', newValue);
		this.emojiList.setAttribute('emoji-style', newValue);
	}

	/**
	 * Initializes the <emoji-settings> element.
	 *
	 * @param {Object} config
	 * @param {Array} config.languages
	 * @param {String} config.style
	 * @param {String} config.attr
	 */
	initialize (config = {}) {
		this.subscriptions = new CompositeDisposable();
		this.languages = config.languages;
		this.emojiStyle = config.style;

		this.subscriptions.add(
			atom.config.onDidChange(
				'emoji-syntax.emojiStyles',
				this.onChangeEmojiStyle.bind(this)
			)
		);

		this.setAttribute('emoji-style', config.attr);
		this.appendChild(this.overlay);
		this.appendChild(this.emojiList);
		this.appendChild(this.createHeader());
		this.languages.forEach(
			lang => this.appendChild(this.createSettingsPanel(lang))
		);

		this.overlay.addEventListener('click', this.closeEmojiList);
		this.emojiList.setEmojiStyles(config.attr);
		this.emojiList.addEventListener(
			'update-emoji', this.updateEmojiSettings.bind(this)
		);
	}

	/**
	 * Required method for Atom. Currently not in use.
	 */
	serialize () {}

	/**
	 * Returns the title of the element.
	 * @return {String}
	 */
	getTitle () {
		return this.viewTitle;
	}

	/**
	 * Returns the icon name of the element.
	 * @return {String}
	 */
	getIconName () {
		return this.iconName;
	}
}

export default SettingsElement = document.registerElement('emoji-settings',
	{ prototype: SettingsElement.prototype }
);
