/** @babel */

import { EMOJI_SETTINGS_ELEMENT } from '../constants'
import { createNode } from '../helpers'
import CatalogElement from './emojisyntax-catalog'
import DirectoryElement from './emojisyntax-directory'
import PanelElement from './emojisyntax-panel'
import { getAllLanguages, getLanguage } from '../language-data'

/**
 * The `<emojisyntax-settings>` element.
 * @class SettingsElement
 * @extends HTMLElement
 */
class SettingsElement extends HTMLElement {
  createdCallback () {
    // Data
    this.viewTitle = 'Emoji Syntax: Settings'
    this.iconName = 'emoji-syntax'
    this.languages = getAllLanguages()
    this.activeLanguage = this.languages[0].name.toLowerCase()
    this.emojiStyle = null
    this.imagePath = null
    this.selected = { language: null, keyword: null }
    // Elements
    this.$overlay = createNode('div', { className: 'settings-overlay' })
    this.$catalog = new CatalogElement()
    this.$header = this.createHeader()
    this.$directory = new DirectoryElement()
    this.$languageSettings = createNode('div', { className: 'settings-config' })
    this.$content = this.createContent()
    // Event listener
    this.$directory.addEventListener('directory-update', this.updateFromDirectory.bind(this))
    this.$overlay.addEventListener('click', this.closeEmojiCatalog)
    this.$catalog.addEventListener('update-emoji', this.updateEmojiSettings.bind(this))
    // Append DOM elements
    this.appendChild(this.$overlay)
    this.appendChild(this.$catalog)
    this.appendChild(this.$header)
    this.appendChild(this.$content)
    this.languages.forEach(lang => this.$languageSettings.appendChild(this.createPanel(lang)))
  }

  /**
   * Updates the stylesheet by emitting on event for the constructor.
   * @param {String} type
   * @param {Object} detail
   * @return {undefined}
   */
  emitConstructorUpdate ({ type, detail }) {
    this.emitter.emit(type, detail)
  }

  /**
   * Updates internal data.
   * @param {String} language
   * @param {String} keyword
   * @return {undefined}
   */
  updateSelected ({ language, keyword }) {
    this.selected.language = language
    this.selected.keyword = keyword
  }

  /**
   * Creates the header area of the settings page.
   * @return {HTMLElement}
   */
  createHeader () {
    const $header = createNode('header')
    const $group = createNode('section')
    const $title = createNode('h1', {
      className: 'text-highlight',
      textContent: `🛠 ${this.viewTitle}`
    })
    const $subline = createNode('h3', {
      className: ['icon', 'icon-paintcan'],
      innerHTML: `Active emoji style: <span>${this.emojiStyle}</span>`
    })

    $group.appendChild($title)
    $group.appendChild($subline)
    $header.appendChild($group)

    return $header
  }

  /**
   * Creates the content area of the settings page.
   * @return {HTMLElement}
   */
  createContent () {
    const $wrapper = createNode('div', { className: 'settings-content' })
    $wrapper.appendChild(this.$directory)
    $wrapper.appendChild(this.$languageSettings)
    return $wrapper
  }

  /**
   * Creates a panel element with all keywords.
   * @param {Object} data
   * @return {HTMLElement}
   */
  createPanel (data = {}) {
    const $panel = new PanelElement()
    $panel.config = data
    $panel.addEventListener('open-list', this.openCatalog.bind(this))
    $panel.addEventListener('update-keyword', this.emitConstructorUpdate.bind(this))
    $panel.addEventListener('set-default', this.emitConstructorUpdate.bind(this))
    return $panel
  }

  /**
   * Updates internal data, adds a class to itself and
   * updates the `<emojisyntax-catalog>` element.
   * @param {Object} event
   * @return {undefined}
   */
  openCatalog (event) {
    const { current, language, keyword } = event.detail
    this.$catalog.setCurrent(current)
    this.classList.toggle('emoji-overlay')
    this.updateSelected({ language, keyword })
  }

  /**
   * Removes the `.emoji-overlay` class.
   * @return {undefined}
   */
  closeEmojiCatalog () {
    const $parent = this.parentNode
    if ($parent.classList.contains('emoji-overlay')) {
      $parent.classList.remove('emoji-overlay')
    }
  }

  /**
   * Displays or hides the language panel item.
   * @param  {Object} detail
   * @return {undefined}
   */
  updateFromDirectory ({ detail }) {
    const { language, active } = detail
    const $previous = this.querySelector(
      `emojisyntax-panel[data-language="${this.activeLanguage}"]`
    )
    const $panel = this.querySelector(`emojisyntax-panel[data-language="${language}"]`)

    if (active !== undefined) {
      const { name, userSettings } = getLanguage(language)
      userSettings.set('active', active)
      this.emitter.emit('update-stylesheet')
      this.togglePanel(active, name.toLowerCase())
      return
    }

    if (this.activeLanguage === language || (!$previous && !$panel)) {
      return
    }

    $previous.style.display = 'none'
    $panel.style.display = 'block'
    this.activeLanguage = language
  }

  togglePanel (state, name) {
    const $panel = this.querySelector(`emojisyntax-panel[data-language="${name}"]`)
    if (state === true) {
      return $panel.enable()
    }
    $panel.disable()
  }

  /**
   * Updates the emoji settings.
   * @param {Object} event
   * @param {Object} event.detail
   * @param {String} event.detail.emoji
   * @param {String} event.detail.lang
   * @param {String} event.detail.keyword
   * @return {undefined}
   */
  updateEmojiSettings (event) {
    const { emoji } = event.detail
    const { language, keyword } = this.selected
    const $panel = this.querySelector(`emojisyntax-panel[data-language="${language}"]`)

    $panel.updateSettings({ emoji, language, keyword })
    this.classList.toggle('emoji-overlay')
    this.updateSelected({ language: null, keyword: null })
  }

  /**
   * Changes the `emoji-style` attribute on `<emojisyntax-settings>` and `<emoji-style>`
   * @param {Object} data
   * @return {undefined}
   */
  onChangeEmojiStyle (data) {
    const { attr, style, path } = data
    const $panels = [...this.querySelectorAll('emojisyntax-panel')]
    const $headlineSpan = this.querySelector('header h3 span')

    this.setAttribute('emoji-style', attr)
    this.$catalog.setEmojiStyles(attr)

    $headlineSpan.textContent = style
    $panels.forEach($item => $item.updateImagePath(path))
  }

  /**
   * Initializes the `<emoji-settings>` element.
   * @param {Object} emitter
   * @param {String} style
   * @param {String} attr
   * @param {String} imagePath
   * @return {undefined}
   */
  initialize ({ emitter, style, attr, imagePath }) {
    this.imagePath = imagePath
    this.emojiStyle = style
    this.emitter = emitter
    this.emitter.on('emoji-settings:update', this.onChangeEmojiStyle.bind(this))

    this.setAttribute('emoji-style', attr)
    this.$header.querySelector('h3 span').textContent = this.emojiStyle
    this.$catalog.setEmojiStyles(attr)

    Array.from(this.$languageSettings.querySelectorAll('emojisyntax-panel'))
      .forEach($el => $el.updateImagePath(this.imagePath))
  }

  /**
   * Required method for Atom. Currently not in use.
   * @return {undefined}
   */
  serialize () {}

  /**
   * Returns the title of the element.
   * @return {String}
   */
  getTitle () {
    return this.viewTitle
  }

  /**
   * Returns the icon name of the element.
   * @return {String}
   */
  getIconName () {
    return this.iconName
  }
}

export default document.registerElement(
  EMOJI_SETTINGS_ELEMENT,
  { prototype: SettingsElement.prototype }
)
