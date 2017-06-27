/** @babel */

import { createNode, getListOfEmoji, getImageSourcePath } from '../helpers'
import { EMOJI_CATALOG_ELEMENT } from '../constants'

/**
 * The `<emojisyntax-catalog>` element.
 * @class CatalogElement
 * @extends HTMLElement
 */
class CatalogElement extends HTMLElement {
  createdCallback () {
    this.iconSet = null
    this.emojiList = getListOfEmoji()
    this.$wrapper = createNode('div', {
      className: ['select-list', 'popover-list']
    })

    Object.keys(this.emojiList).forEach(this.createList.bind(this))
    this.appendChild(this.$wrapper)
    this.addEventListener('click', this.manageElementEvents)
  }

  /**
   * Creates a section with a list of emoji.
   * @param {String} category
   * @param {Number} index
   * @return {undefined}
   */
  createList (category, index) {
    const $section = createNode('section', { className: category })
    const $title = createNode('h2', {
      textContent: category.replace(/_/g, ' '),
      className: ['text-highlight', 'selected', 'icon', 'icon-unfold']
    })
    const $list = createNode('ul', { className: 'list' })

    // First section should always be open and with content.
    if (index === 0) {
      $list.appendChild(this.createListItems(category))
      $list.classList.add('list-open')
    }

    $section.appendChild($title)
    $section.appendChild($list)

    return this.$wrapper.appendChild($section)
  }

  /**
   * Creates list items for the emoji list view.
   * @param {String} category
   * @return {HTMLElement}
   */
  createListItems (category) {
    const fragment = document.createDocumentFragment()

    this.emojiList[category].forEach(item => {
      const [emoji, unicode] = item
      const imgSource = getImageSourcePath({ emoji, unicode })
      const $native = createNode('span', {
        className: 'list-emoji-native',
        textContent: emoji
      })
      const $custom = createNode('span', {
        className: 'list-emoji-custom',
        textContent: emoji,
        attributes: imgSource ? { style: `background-image: url(${imgSource})` } : {}
      })
      const $li = createNode('li', {
        attributes: { 'data-emoji-hexadecimal': unicode },
        append: createNode('div')
      })

      $li.children[0].appendChild($native)
      $li.children[0].appendChild($custom)
      fragment.appendChild($li)
    })

    return fragment
  }

  /**
   * Creates a section with the current emoji.
   * @param {String} char
   * @return {HTMLElement}
   */
  createCurrentSection (char) {
    const $section = createNode('section', {
      className: ['current', 'select-list', 'popover-list']
    })
    const $title = createNode('h2', { textContent: 'Current:' })
    const $emoji = createNode('span', { textContent: char })
    const path = getImageSourcePath({ emoji: char })
    const $img = createNode('img', {
      attributes: {
        src: path,
        alt: char
      }
    })

    $title.appendChild($emoji)
    $title.appendChild($img)
    $section.appendChild($title)

    return $section
  }

  /**
   * Sets the custom attribute `emoji-style=""` to the element.
   * @param {String} attr
   * @return {String}
   */
  setEmojiStyles (attr) {
    const $current = this.querySelector('.current span')

    this.iconSet = attr.replace(/\s/g, '-').toLowerCase()
    this.setAttribute('emoji-style', this.iconSet)
    this.updateList()
    this.resetCategories()

    if ($current) {
      this.setCurrent($current.textContent)
    }

    return this.iconSet
  }

  /**
   * Adds an element to the top with the current emoji.
   * @param {String} char
   * @return {undefined}
   */
  setCurrent (char) {
    if (this.firstChild.classList.contains('current')) {
      this.removeChild(this.firstChild)
    }
    this.insertBefore(this.createCurrentSection(char), this.firstChild)
  }

  /**
   * Toggles class to show/hide custom emoji
   * @return {undefined}
   */
  updateList () {
    const contains = (name) => this.classList.contains(name)

    if (this.iconSet !== 'native') {
      this.classList.add('show-custom')
    } else if (this.iconSet === 'native' && contains('show-custom')) {
      this.classList.remove('show-custom')
    }
  }

  /**
   * Dispatches a custom event with the updated emoji data.
   * @param {HTMLElement} $element
   * @return {Boolean}
   */
  dispatchUpdate ($element) {
    const $parent = $element.parentNode.parentNode // Get the <li>
    const unicode = $parent.getAttribute('data-emoji-hexadecimal')
    const emoji = $element.textContent

    return this.dispatchEvent(new CustomEvent('update-emoji', {
      detail: { emoji, unicode }
    }))
  }

  /**
   * Toggles visibility of category as well as loads emoji.
   * @param {HTMLElement} $element
   * @return {undefined}
   */
  toggleCategory ($element) {
    const $parent = $element.parentNode
    const $list = $element.nextElementSibling
    $list.classList.toggle('list-open')

    if ($list.childElementCount === 0) {
      const $category = $parent.classList[0]
      $list.appendChild(this.createListItems($category))
    }
  }

  /**
   * Resets the category lists by removing all items and removing classes.
   * @return {undefined}
   */
  resetCategories () {
    const lists = [...this.querySelectorAll('section .list')]

    lists.forEach(($list, index) => {
      while ($list.firstChild) {
        $list.removeChild($list.firstChild)
      }

      if (index === 0) {
        $list.classList.add('list-open')
        $list.appendChild(this.createListItems($list.parentNode.classList[0]))
      } else {
        $list.classList.remove('list-open')
      }
    })
  }

  /**
   * Dispatches a custom event with the previously selected emoji and unicode.
   * @param {Object} event
   * @return {undefined}
   */
  manageElementEvents (event) {
    const { target } = event
    const el = (name) => target.classList.contains(name)

    // <h2> is clicked
    if (el('text-highlight') && el('selected')) {
      this.toggleCategory(target)
    // <li> item is clicked
    } else if (el('list-emoji-native') || el('list-emoji-custom')) {
      this.dispatchUpdate(target)
    }
  }
}

export default document.registerElement(
  EMOJI_CATALOG_ELEMENT,
  { prototype: CatalogElement.prototype }
)
