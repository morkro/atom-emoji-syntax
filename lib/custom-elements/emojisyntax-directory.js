/** @babel */

import { EMOJI_DIRECTORY_ELEMENT } from '../constants'
import { createNode } from '../helpers'
import { getAllLanguages } from '../language-data'

/**
 * The `<emojisyntax-directory>` element
 * @class DirectoryElement
 * @extends HTMLUListElement
 */
class DirectoryElement extends HTMLUListElement {
  createdCallback () {
    // Data
    this.languages = getAllLanguages()
    // Elements
    this.classList.add('list-group')
    this.addEventListener('click', this.selectLanguage.bind(this))
    this.appendChild(this.createList())
  }

  /**
   * Creates the `<ul>` element with all content.
   * @return {HTMLElement}
   */
  createList () {
    const fragment = document.createDocumentFragment()
    this.languages.forEach((lang, index) =>
      fragment.appendChild(this.createListItem(lang, index))
    )
    return fragment
  }

  /**
   * Creates a single list element.
   * @param  {Object} data - User settings object
   * @param  {Number} index - Index of the iteration
   * @return {HTMLElement}
   */
  createListItem (data = {}, index = 0) {
    const { name, userSettings } = data
    const btnClasses = ['btn', 'btn-lg']
    const $li = createNode('li', {
      className: 'list-item',
      attributes: { 'data-emoji-language': name.toLowerCase() }
    })
    const $btn = createNode('button', {
      className: (index === 0) ? ['btn-info', 'selected', ...btnClasses] : btnClasses,
      textContent: name
    })
    const $input = createNode('input', {
      className: 'input-checkbox',
      attributes: { type: 'checkbox' }
    })

    if (userSettings.all.active) {
      $input.setAttribute('checked', 'checked')
    }

    $li.appendChild($input)
    $li.appendChild($btn)

    return $li
  }

  /**
   * Dispatches off a custom event called `directory-update` containing the language
   * and active state of the language.
   * @param  {HTMLElement} target
   * @return {undefined}
   */
  selectLanguage ({ target }) {
    const { nodeName, parentNode, checked } = target
    if (nodeName === 'LI' || nodeName === EMOJI_DIRECTORY_ELEMENT.toUpperCase()) {
      return
    }

    if (nodeName === 'INPUT') {
      target.nextElementSibling.disabled = !checked
    } else if (nodeName === 'BUTTON') {
      this.querySelector('button.selected').classList.remove('selected', 'btn-info')
      target.classList.add('selected', 'btn-info')
    }

    this.dispatchEvent(new CustomEvent('directory-update', {
      detail: {
        language: parentNode.getAttribute('data-emoji-language'),
        active: checked
      }
    }))
  }
}

export default document.registerElement(
  EMOJI_DIRECTORY_ELEMENT,
  { prototype: DirectoryElement.prototype }
)
