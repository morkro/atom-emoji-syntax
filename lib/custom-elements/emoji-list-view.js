'use babel';

import createNode from '../helpers/create-node';
import getListOfEmoji from '../helpers/get-list-of-emoji';

/**
 * =========================================================================== *
 *                       🔮 THE <emoji-list> ELEMENT 🔮
 * =========================================================================== *
 */
class EmojiListView extends HTMLElement {
	createdCallback () {
		this.emojiList = getListOfEmoji();
		this.wrapper = createNode('div', {
			className: ['select-list', 'popover-list']
		});

		Object.keys(this.emojiList).forEach(this.createList.bind(this));
		this.appendChild(this.wrapper);
		this.addEventListener('click', this.updateEmoji);
	}

	/**
	 * Sets the custom attribute 'emoji-style=""' to the element.
	 * @param {String} attr
	 */
	setEmojiStyles (attr) {
		return this.setAttribute(
			'emoji-style',
			attr.replace(/\s/g, '-').toLowerCase()
		);
	}

	/**
	 * Creates a title element.
	 * @param  {String} title
	 * @return {HTMLElement}
	 */
	createTitle (title) {
		return createNode('h2', {
			textContent: title.replace(/_/g, ' '),
			className: ['text-highlight', 'selected']
		});
	}

	/**
	 * Creates a section with a list of emoji.
	 * @param  {String} category
	 */
	createList (category) {
		const section = createNode('section', { className: category });
		const title = this.createTitle(category);
		const list = createNode('ul', { className: 'list' });

		this.emojiList[category].forEach(item => {
			list.appendChild(createNode('li', {
				append: createNode('span', {
					className: 'list-emoji',
					textContent: item
				})
			}));
		});

		section.appendChild(title);
		section.appendChild(list);
		this.wrapper.appendChild(section);
	}

	/**
	 * Adds an element to the top with the current emoji.
	 * @param {String} char
	 */
	setCurrent (char) {
		if (this.firstChild.classList.contains('current')) {
			this.removeChild(this.firstChild);
		}
		this.insertBefore(this.createCurrentSection(char), this.firstChild);
	}

	/**
	 * Creates a section with the current emoji.
	 * @param  {String} char
	 * @return {HTMLElement}
	 */
	createCurrentSection (char) {
		const section = createNode('section', {
			className: ['current', 'select-list', 'popover-list']
		});
		const title = createNode('h2', { textContent: 'Current:' });
		const emoji = createNode('span', { textContent: char });
		title.appendChild(emoji);
		section.appendChild(title);
		return section;
	}

	/**
	 * Dispatches a custom event with the previously selected emoji.
	 * @param  {Object} event
	 */
	updateEmoji (event) {
		if (event.target.classList.contains('list-emoji')) {
			const update = new CustomEvent('update-emoji', {
				detail: {
					emoji: event.target.textContent
				}
			});
			this.dispatchEvent(update);
		}
	}
}

export default EmojiListView = document.registerElement(
	'emoji-list', { prototype: EmojiListView.prototype }
);
