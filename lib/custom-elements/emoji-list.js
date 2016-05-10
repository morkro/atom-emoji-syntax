'use babel';

import createNode from '../helpers/create-node';
import getListOfEmoji from '../helpers/get-list-of-emoji';
import getImageSourcePath from '../helpers/get-source-path';


/**
 * =========================================================================== *
 *                       🔮 THE <emoji-list> ELEMENT 🔮
 * =========================================================================== *
 *
 * @class ListElement
 * @extends HTMLElement
 */
class ListElement extends HTMLElement {
	createdCallback () {
		this.iconSet = null;
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
		this.iconSet = attr.replace(/\s/g, '-').toLowerCase();
		this.setAttribute('emoji-style', this.iconSet);
		this.updateList();
		this.updateCurrent();
		return this.iconSet;
	}

	/**
	 * Creates a title element.
	 *
	 * @param {String} title
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
	 * @param {String} category
	 */
	createList (category) {
		const section = createNode('section', { className: category });
		const list = createNode('ul', { className: 'list' });

		this.emojiList[category].forEach(item => {
			const [emoji, unicode] = item;
			const imgSource = getImageSourcePath({ emoji, unicode });
			const native = createNode('span', {
				className: 'list-emoji-native',
				textContent: emoji
			});
			const custom = createNode('span', {
				className: 'list-emoji-custom',
				textContent: emoji,
				attributes: { style: `background-image: url(${imgSource});` }
			});
			const li = createNode('li', {
				attributes: { 'data-emoji-hexadecimal': unicode },
				append: createNode('div')
			});

			li.children[0].appendChild(native);
			li.children[0].appendChild(custom);
			list.appendChild(li);
		});

		section.appendChild(this.createTitle(category));
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
	 *
	 * @param {String} char
	 * @return {HTMLElement}
	 */
	createCurrentSection (char) {
		const section = createNode('section', {
			className: ['current', 'select-list', 'popover-list']
		});
		const title = createNode('h2', { textContent: 'Current:' });
		const emoji = createNode('span', { textContent: char });
		const img = createNode('img', {
			attributes: {
				src: getImageSourcePath({ emoji: char }),
				alt: char
			}
		});

		title.appendChild(emoji);
		title.appendChild(img);
		section.appendChild(title);

		return section;
	}

	/**
	 * Toggles class to show/hide custom emoji
	 * @return {undefined}
	 */
	updateList () {
		if (this.iconSet !== 'native') {
			const custom = this.querySelectorAll('.list-emoji-custom');
			[...custom].forEach(item => {
				const path = getImageSourcePath({ emoji: item.textContent });
				item.style.backgroundImage = `url(${path})`;
			});
			this.classList.add('show-custom');
		}
		else if (
			this.iconSet === 'native' &&
			this.classList.contains('show-custom')
		) {
			this.classList.remove('show-custom');
		}
	}

	/**
	 * Dispatches a custom event with the previously selected emoji and unicode.
	 * @param {Object} event
	 * @return {undefined}
	 */
	updateEmoji (event) {
		const { target } = event;
		const parent = target.parentNode.parentNode; // Get the <li>

		if (
			target.classList.contains('list-emoji-native') ||
			target.classList.contains('list-emoji-custom')
		) {
			const unicode = parent.getAttribute('data-emoji-hexadecimal');
			const emoji = target.textContent;

			this.dispatchEvent(new CustomEvent('update-emoji', {
				detail: { emoji, unicode }
			}));
		}
	}
}

export default ListElement = document.registerElement('emoji-list',
	{ prototype: ListElement.prototype }
);
