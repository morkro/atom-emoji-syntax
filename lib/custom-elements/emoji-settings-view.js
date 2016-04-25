'use babel';

// Helpers
import { getLanguage } from '../helpers/get-all-languages';
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
// Package core
import EmojiListView from './emoji-list-view';
import EmojiKeywordView from './emoji-keyword-view';
import { updateStyleSheet } from '../stylesheet';

/**
 * =========================================================================== *
 *                     🔮 THE <emoji-settings> ELEMENT 🔮
 * =========================================================================== *
 */
class EmojiSettingsView extends HTMLElement {
	createdCallback () {
		this.languages = null;
		this.emojiStyle = null;
		this.viewTitle = 'Emoji Syntax: Settings';
		this.iconName = 'emoji-syntax';
		this.emojiList = new EmojiListView();
		this.activeKeyword = { language: null, keyword: null };
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
			textContent: 'Emoji Syntax: Settings 🔧'
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
	 * @param  {Object} data
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
				const keyword = new EmojiKeywordView();

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
	 * @param  {Object} event
	 */
	openListView (event) {
		const details = event.detail;

		this.activeKeyword.language = details.language;
		this.activeKeyword.keyword = details.keyword;
		this.emojiList.setCurrent(details.current);
		this.classList.toggle('emoji-overlay');
	}

	/**
	 * Activates/deactivates a panel.
	 * @param  {Object} event
	 */
	managePanelItem (event) {
		const target = event.target;
		const isElement = target instanceof HTMLElement;
		let language = null;

		if (isElement && target.nodeName === 'H2') {
			this.parentNode.classList.toggle('is-collapsed');
		}
		else if (isElement && target.classList.contains('btn-toggle-language')) {
			language = getLanguage(this.parentNode.getAttribute('data-emoji-language'));

			this.parentNode.classList.toggle('is-collapsed');
			this.parentNode.classList.toggle('is-inactive');

			target.classList.toggle('btn-primary');
			target.classList.toggle('selected');

			language.set('active', !!target.classList.contains('selected'));
			updateStyleSheet();
		}
	}

	/**
	 * Toggles all columns.
	 * @param  {Object} event
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
	 * @param  {Object}  event
	 */
	updateEmojiSettings (event) {
		const emoji = event.detail.emoji;
		const language = `[data-emoji-language="${this.activeKeyword.language}"]`;
		const keyword = `[data-emoji-keyword="${this.activeKeyword.keyword}"]`;
		const keywordElement = this.querySelector(`${language}${keyword}`);

		keywordElement.updateSettings({
			emoji,
			lang: this.activeKeyword.language,
			keyword: this.activeKeyword.keyword
		});
		this.classList.toggle('emoji-overlay');
		this.resetActiveKeyword();
	}

	/**
	 * Initializes the <emoji-settings> element.
	 * @param  {Object} project [Currently pointless]
	 */
	initialize (config = {}) {
		const settingsOverlay = createNode('div', {
			className: 'settings-overlay'
		});

		this.languages = config.languages;
		this.emojiStyle = config.style;
		this.appendChild(this.emojiList);
		this.appendChild(this.createHeader());
		this.languages.forEach(
			lang => this.appendChild(this.createSettingsPanel(lang))
		);
		this.appendChild(settingsOverlay);

		settingsOverlay.addEventListener('click', this.closeEmojiList);
		this.emojiList.setEmojiStyles(this.emojiStyle);
		this.emojiList.addEventListener('update-emoji', this.updateEmojiSettings.bind(this));
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

export default EmojiSettingsView = document.registerElement('emoji-settings',
	{ prototype: EmojiSettingsView.prototype }
);
