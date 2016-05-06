'use babel';

// Helpers
import { getLanguage, getAllLanguages } from '../helpers/get-all-languages';
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
// Custom elements
import ListElement from './emoji-list';
import KeywordElement from './emoji-keyword';

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
		this.languages = getAllLanguages(true);
		this.viewTitle = 'Emoji Syntax: Settings';
		this.iconName = 'emoji-syntax';
		this.emojiStyle = null;
		this.emojiList = new ListElement();
		this.selected = { language: null, keyword: null };
		this.overlay = createNode('div', { className: 'settings-overlay' });

		this.overlay.addEventListener('click', this.closeEmojiList);
		this.emojiList.addEventListener(
			'update-emoji', this.updateEmojiSettings.bind(this)
		);

		this.appendChild(this.overlay);
		this.appendChild(this.emojiList);
		this.appendChild(this.createHeader());
		this.languages.forEach(lang => this.appendChild(this.createPanel(lang)));
	}

	/**
	 * Updates internal data.
	 */
	updateSelected ({ language, keyword }) {
		this.selected.language = language;
		this.selected.keyword = keyword;
	}

	/**
	 * Creates the header area of the settings page.
	 * @return {HTMLElement}
	 */
	createHeader () {
		const header = createNode('header');
		const group = createNode('section');
		const title = createNode('h1', {
			textContent: `${this.viewTitle} 🔧`
		});
		const subline = createNode('h3', {
			className: ['icon', 'icon-paintcan'],
			innerHTML: `Active emoji style: <span>${this.emojiStyle}</span>`
		});
		const toggleLanguages = createNode('button', {
			className: ['btn', 'toggle-languages'],
			textContent: 'Toggle all sections'
		});

		group.appendChild(title);
		group.appendChild(subline);
		header.appendChild(group);
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
	createPanel (data = {}) {
		const { active, languageName } = data;
		const activeButton = active ? 'btn-primary selected' : '';
		const btnClasses = 'btn-toggle-language btn btn-sm icon icon-check';
		const wrapper = createNode('atom-panel', {
			className: ['top', 'inset-panel'],
			attributes: { 'data-emoji-language': languageName.toLowerCase() }
		});

		wrapper.innerHTML = HTML`
			<div class="panel-heading">
				<div class="panel-group">
					<button class="${btnClasses} ${activeButton}"></button>
					<h2 class="inline-block">${languageName}</h2>
				</div>
			</div>
			<div class="panel-body"></div>
		`;

		if (!active) {
			wrapper.classList.add('is-inactive', 'is-collapsed');
		}

		// Grab .panel-heading
		wrapper.children[0].addEventListener('click', this.managePanelItem);
		// Grabs .panel-body and appends keywords
		this.createKeywordElements(data, wrapper.children[1]);

		return wrapper;
	}

	/**
	 * Creates keyword elements and appends them to given parent element.
	 *
	 * @param {Object} data
	 * @param {HTMLElement} parent
	 *
	 * @return {undefined}
	 */
	createKeywordElements (data, parent) {
		const { languageName, languageSelector } = data;
		const keywordData = Object.keys(data).filter(lang => !!data[lang].emoji);

		keywordData.forEach(lang => {
			const keyword = new KeywordElement();

			keyword.initialize({
				language: languageName,
				selector: languageSelector,
				keyword: lang,
				content: data[lang]
			});

			keyword.addEventListener(
				'emoji-keyword:open-list', this.openListView.bind(this)
			);

			parent.appendChild(keyword);
		});
	}

	/**
	 * Updates internal data, adds a class to itself and
	 * updates the <emoji-list> element.
	 * @param {Object} event
	 */
	openListView (event) {
		const { current, language, keyword } = event.detail;
		this.emojiList.setCurrent(current);
		this.classList.toggle('emoji-overlay');
		this.updateSelected({ language, keyword });
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
			this.emitter.emit('emoji-settings:update-stylesheet');
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
		const { language: lang, keyword } = this.selected;
		const keywordElement = this.querySelector(
			`[data-language="${lang}"][data-keyword="${keyword}"]`
		);

		keywordElement.updateSettings({ emoji, lang, keyword });
		this.classList.toggle('emoji-overlay');
		this.updateSelected({ language: null, keyword: null });
	}

	/**
	 * Changes the 'emoji-style' attribute on <emoji-settings> and <emoji-style>
	 *
	 * @param {Object} data
	 * @return {undefined}
	 */
	onChangeEmojiStyle (data) {
		const { attr, style } = data;
		this.setAttribute('emoji-style', attr);
		this.emojiList.setEmojiStyles(attr);
		this.querySelector('header h3 span').textContent = style;
	}

	/**
	 * Initializes the <emoji-settings> element.
	 *
	 * @param {Object} emitter
	 * @param {String} attr
	 */
	initialize ({ emitter, style, attr }) {
		this.emojiStyle = style;
		this.emitter = emitter;
		this.emitter.on(
			'emoji-settings:update', this.onChangeEmojiStyle.bind(this)
		);

		this.setAttribute('emoji-style', attr);
		this.emojiList.setEmojiStyles(attr);
		this.querySelector('header h3 span').textContent = this.emojiStyle;
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
