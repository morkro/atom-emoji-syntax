/** @babel */

import { EMOJI_PANEL_ELEMENT } from '../constants'
import { createNode, getHexadecimalUnicode } from '../helpers'
import { getDefaultSettings } from '../language-data'

/**
 * The `<emojisyntax-panel>` element.
 * @class PanelElement
 * @extends HTMLElement
 */
class PanelElement extends HTMLElement {
  createdCallback () {
    // Data
    this.imagePath = null
    this.panelActive = true
    this.languageName = null
    this.languageData = []
    this.tableCategories = ['Active', 'Keyword', 'Emoji', 'Position', 'Spacing']
    // Elements
    this.$header = createNode('header', {
      innerHTML: '<h2 class="inline-block"></h2>'
    })
    this.$defaultButton = createNode('button', {
      className: 'btn',
      textContent: 'Set to default'
    })
    this.$table = this.createTable()

    this.$header.appendChild(this.$defaultButton)
    this.appendChild(this.$header)
    this.appendChild(this.$table)

    this.$defaultButton.addEventListener('click', this.setDefaultSettings.bind(this))
  }

  /**
   * This method is called when the element is attached to the DOM.
   * Fills element with the actual content.
   * @return {undefined}
   */
  attachedCallback () {
    if (!this.panelActive) {
      this.classList.add('is-inactive')
    }

    const $tbody = this.$table.querySelector('tbody')

    this.updateImagePath()
    this.setAttribute('data-language', this.languageName.toLowerCase())
    this.$header.querySelector('h2').textContent = this.languageName

    if ($tbody.childNodes.length === 0) {
      $tbody.appendChild(this.createTableKeywords())
    }
  }

  /**
   * Sets the config.
   * @param  {String} name
   * @param  {Object} userSettings
   * @return {undefined}
   */
  set config ({ name, userSettings }) {
    this.panelActive = userSettings.all.active
    this.languageName = name
    this.languageData = this.filterLanguageData(userSettings.all)
  }

  /**
   * Disables the module by adding a class `.is-inactive`.
   * @return {undefined}
   */
  disable () {
    this.classList.add('is-inactive')
  }

  /**
   * Enables the module by removing the class `.is-inactive`.
   * @return {undefined}
   */
  enable () {
    this.classList.remove('is-inactive')
  }

  /**
   * Returns a new array with the filtered language data.
   * @param  {Object} settings
   * @return {Array}
   */
  filterLanguageData (settings = {}) {
    return Object.keys(settings)
      .map(keyword => {
        settings[keyword].name = keyword
        return settings[keyword]
      })
      .filter(keyword => typeof keyword === 'object')
  }

  /**
   * Dispatches a custom event
   * @param {String} name
   * @param {Object} detail
   * @return {undefined}
   */
  dispatchElementUpdate (name, detail = {}) {
    if (!name) return
    this.dispatchEvent(new CustomEvent(name, { detail }))
  }

  /**
   * @todo Implement feature.
   * @return {undefined}
   */
  setDefaultSettings () {
    const language = this.languageName.toLowerCase()
    const defaultSettings = getDefaultSettings(language)
    this.dispatchElementUpdate('set-default', { language })

    Object.keys(defaultSettings)
      .filter(keyword => keyword !== 'active')
      .forEach(keyword => {
        const { emoji, pseudo, spacing } = defaultSettings[keyword]
        const pseudoOpposite = (pseudo === 'before') ? 'after' : 'before'
        const $tr = this.$table.querySelector(`tr[data-keyword="${keyword}"]`)
        const $active = $tr.querySelector('td[data-config="active"] input')
        const $emoji = $tr.querySelector('td[data-config="emoji"]')
        const $pseudo = $tr.querySelector('[data-config="pseudo"]')
        const $spacing = $tr.querySelector('[data-config="spacing"] input')

        $active.checked = defaultSettings.active
        $emoji.setAttribute('data-emoji', emoji)
        $emoji.setAttribute('data-unicode', getHexadecimalUnicode(emoji))
        $emoji.querySelector('.emoji-native').textContent = emoji
        $pseudo.querySelector(`[data-position="${pseudo}"]`).classList.add('selected')
        $pseudo.querySelector(`[data-position="${pseudoOpposite}"]`).classList.remove('selected')
        $spacing.checked = spacing

        this.updateImagePath()
      })
  }

  /**
   * Updates the image path to custom emoji.
   * @param {String} path
   * @return {undefined}
   */
  updateImagePath (path = this.imagePath) {
    this.imagePath = path
    Array.from(this.querySelectorAll('.emoji-unicode'))
      .forEach($el => {
        const unicode = $el.closest('[data-unicode]').getAttribute('data-unicode')
        $el.style.backgroundImage = `url(${this.imagePath}/${unicode}.svg)`
      })
  }

  /**
   * Takes all data from the keyword element and dispatches off an event.
   * @param {HTMLElement} target
   * @return {undefined}
   */
  updateKeywordSettings ({ target }) {
    const $parent = target.closest('td[data-config]')
    if ($parent === null || target.nodeName === 'TD') return

    let name = 'update-keyword'
    const configType = $parent.getAttribute('data-config')
    const config = {
      language: this.getAttribute('data-language'),
      keyword: $parent.parentNode.getAttribute('data-keyword')
    }

    if (configType === 'active') {
      config.property = 'active'
      config.newValue = target.checked
    } else if (configType === 'emoji') {
      name = 'open-list'
      config.current = $parent.getAttribute('data-emoji')
    } else if (configType === 'pseudo') {
      const position = target.getAttribute('data-position')

      $parent
        .querySelector(`[data-position="${(position === 'before') ? 'after' : 'before'}"]`)
        .classList.remove('selected')
      target.classList.add('selected')

      config.property = 'pseudo'
      config.newValue = position
    } else if (configType === 'spacing') {
      config.property = 'spacing'
      config.newValue = target.checked
    }

    this.dispatchElementUpdate(name, config)
  }

  /**
   * Updates the lanuage selector and content with the new emoji.
   * @param {Object} settings
   * @param {String} settings.language
   * @param {String} settings.keyword
   * @param {String} settings.emoji
   * @return {undefined}
   */
  updateSettings (settings = {}) {
    const { language, keyword, emoji } = settings
    const $emojiConfig = this.$table.querySelector(
      `[data-keyword="${keyword}"] [data-config="emoji"]`
    )
    const $emojiNative = $emojiConfig.querySelector('.emoji-native')

    $emojiConfig.setAttribute('data-emoji', emoji)
    $emojiConfig.setAttribute('data-unicode', getHexadecimalUnicode(emoji))
    $emojiNative.textContent = emoji
    this.updateImagePath()

    this.dispatchElementUpdate('update-keyword', {
      language,
      keyword,
      property: 'emoji',
      newValue: emoji
    })
  }

  /**
   * Creates the `<table>` element, adds event listener.
   * @return {HTMLElement}
   */
  createTable () {
    const fragment = document.createDocumentFragment()
    const $table = createNode('table')
    const $thead = createNode('thead', { innerHTML: '<tr></tr>' })
    const $tbody = createNode('tbody')

    this.tableCategories.forEach(cat =>
      fragment.appendChild(createNode('th', { textContent: cat }))
    )

    $thead.children[0].appendChild(fragment)
    $table.appendChild($thead)
    $table.appendChild($tbody)
    $tbody.addEventListener('click', this.updateKeywordSettings.bind(this))

    return $table
  }

  /**
   * Loops over the language data and creates all rows with the keyword settings.
   * @return {HTMLElement}
   */
  createTableKeywords () {
    const fragment = document.createDocumentFragment()

    this.languageData.forEach(keyword => {
      const $tr = createNode('tr', {
        attributes: { 'data-keyword': keyword.name }
      })
      const list = Object.keys(keyword)

      list.splice(1, 0, list[list.length - 1])
      list.splice(-1, 1)
      list.forEach(item => {
        let $el = null

        if (item === 'active') {
          $el = this.createStatusElement(keyword[item])
        } else if (item === 'name') {
          $el = this.createNameElement(keyword[item])
        } else if (item === 'emoji') {
          $el = this.createEmojiElement(keyword[item])
        } else if (item === 'pseudo') {
          $el = this.createPositionElement(keyword[item])
        } else if (item === 'spacing') {
          $el = this.createSpacingElement(keyword[item])
        }

        $tr.appendChild($el)
      })

      fragment.appendChild($tr)
    })

    return fragment
  }

  /**
   * Creates the status table element.
   * @param  {Boolean} status
   * @return {HTMLElement}
   */
  createStatusElement (status) {
    return createNode('td', {
      attributes: { 'data-config': 'active' },
      innerHTML: `<input type="checkbox" class="input-checkbox" ${status ? 'checked' : ''}>`
    })
  }

  /**
   * Creates the name table element.
   * @param  {String} name
   * @return {HTMLElement}
   */
  createNameElement (name) {
    return createNode('td', {
      innerHTML: `<h3><code>${name}</code></h3>`
    })
  }

  /**
   * Creates the emoji table element.
   * @param  {String} emoji
   * @return {HTMLElement}
   */
  createEmojiElement (emoji) {
    const unicode = getHexadecimalUnicode(emoji)
    const path = `background-image:url(${this.imagePath}/${unicode}.svg);`
    const imageBackground = (this.imagePath !== null) ? path : ''

    return createNode('td', {
      innerHTML: `
        <button class="emoji-open-list badge icon icon-gear">
          <span class="emoji-native">${emoji}</span>
          <span class="emoji-unicode" style="${imageBackground}"></span>
        </button>
      `,
      attributes: {
        'data-config': 'emoji',
        'data-emoji': emoji,
        'data-unicode': unicode
      }
    })
  }

  /**
   * Creates the position table element.
   * @param  {String} position - Can either be `'before'` or `'after'`
   * @return {HTMLElement}
   */
  createPositionElement (position) {
    const $td = createNode('td', {
      attributes: { 'data-config': 'pseudo' },
      innerHTML: '<div class="btn-group"></div>'
    })
    const $btnBefore = createNode('button', {
      textContent: 'Before',
      className: 'btn',
      attributes: { 'data-position': 'before' }
    })
    const $btnAfter = createNode('button', {
      textContent: 'After',
      className: 'btn',
      attributes: { 'data-position': 'after' }
    })

    if (position === 'before') $btnBefore.classList.add('selected')
    else $btnAfter.classList.add('selected')

    $td.children[0].appendChild($btnBefore)
    $td.children[0].appendChild($btnAfter)

    return $td
  }

  /**
   * Creates the spacing table element.
   * @param  {Boolean} spacing
   * @return {HTMLElement}
   */
  createSpacingElement (spacing) {
    return createNode('td', {
      attributes: { 'data-config': 'spacing' },
      innerHTML: `<input type="checkbox" class="input-checkbox" ${spacing ? 'checked' : ''}>`
    })
  }
}

export default document.registerElement(
  EMOJI_PANEL_ELEMENT,
  { prototype: PanelElement.prototype }
)
