/** @babel */

import path from 'path'
import { CompositeDisposable } from 'atom'
import config from './config-schema.json'
import uri from './constants/uri'
import EmojiSettings from './settings'
import { setLanguageStore } from './language-data'
import { SettingsElement } from './custom-elements'
import {
  styleSheetExists,
  addStyleSheet,
  removeStyleSheet,
  updateStyleSheet
} from './stylesheet'

/**
 *     /$$$$$$$$/$$      /$$ /$$$$$$    /$$$$$/$$$$$$
 *    | $$_____| $$$    /$$$/$$__  $$  |__  $|_  $$_/
 *    | $$     | $$$$  /$$$| $$  \ $$     | $$ | $$
 *    | $$$$$  | $$ $$/$$ $| $$  | $$     | $$ | $$
 *    | $$__/  | $$  $$$| $| $$  | $$/$$  | $$ | $$
 *    | $$     | $$\  $ | $| $$  | $| $$  | $$ | $$
 *    | $$$$$$$| $$ \/  | $|  $$$$$$|  $$$$$$//$$$$$$
 *    |________|__/     |__/\______/ \______/|______/
 *
 *      /$$$$$$ /$$     /$$/$$   /$$/$$$$$$$$/$$$$$$ /$$   /$$
 *     /$$__  $|  $$   /$$| $$$ | $|__  $$__/$$__  $| $$  / $$
 *    | $$  \__/\  $$ /$$/| $$$$| $$  | $$ | $$  \ $|  $$/ $$/
 *    |  $$$$$$  \  $$$$/ | $$ $$ $$  | $$ | $$$$$$$$\  $$$$/
 *     \____  $$  \  $$/  | $$  $$$$  | $$ | $$__  $$ >$$  $$
 *     /$$  \ $$   | $$   | $$\  $$$  | $$ | $$  | $$/$$/\  $$
 *    |  $$$$$$/   | $$   | $$ \  $$  | $$ | $$  | $| $$  \ $$
 *     \______/    |__/   |__/  \__/  |__/ |__/  |__|__/  |__/
 */

const fullSettingsURI = uri.PROTOCOL + uri.SETTINGS

/**
 * The package main object.
 * @name EmojiSyntax
 * @type {Object}
 */
export default {
  config,
  subscriptions: null,
  settings: null,

  /**
   * Adds the stylesheet, commands and listeners.
   * @param {Object} settings
   * @return {undefined}
   */
  activate ({ settings }) {
    this.subscriptions = new CompositeDisposable()
    this.settings = this.createSettingsView(settings)

    setLanguageStore().then(addStyleSheet)
    this.addSubscriptions()
    this.registerView()

    atom.workspace.addOpener(this.validateOpener.bind(this))
  },

  /**
   * Diposes all added subscriptions and removes stylesheet.
   * @return {undefined}
   */
  deactivate () {
    this.subscriptions.dispose()
    const pane = atom.workspace.paneForURI(fullSettingsURI)
    if (pane) pane.destroyItem(pane.itemForURI(fullSettingsURI))
    if (this.settings) this.settings.dispose()
    return removeStyleSheet()
  },

  /**
   * Serialises the package's lifecycle.
   * @return {Object}
   */
  serialize () {
    return {
      settings: this.settings.serialize()
    }
  },

  /**
   * Adds all subscriptions to package.
   * @return {undefined}
   */
  addSubscriptions () {
    const commands = {
      'emoji-syntax:settings': this.openSettings,
      'emoji-syntax:toggle': this.toggleSyntax
    }

    this.subscriptions.add(
      atom.commands.add('atom-workspace', commands),
      atom.config.onDidChange(
        'emoji-syntax.emojiStyles',
        this.updateEmojiStyle.bind(this)
      )
    )
  },

  /**
   * Toggles the stylesheets.
   * @return {Boolean}
   */
  toggleSyntax () {
    if (styleSheetExists()) {
      return removeStyleSheet()
    }

    return addStyleSheet()
  },

  /**
   * Either restores the settings view from a previous session
   * or creates a new one.
   * @param  {String} settings
   * @return {Object}
   */
  createSettingsView (settings) {
    if (settings && settings.style) {
      return atom.deserializers.deserialize(settings)
    }
    return new EmojiSettings({
      style: atom.config.get('emoji-syntax.emojiStyles')
    })
  },

  /**
   * Returns a new pane element.
   * @return {undefined}
   */
  openSettings () {
    let pane = atom.workspace.paneForURI(fullSettingsURI)
    pane = pane || atom.workspace.getActivePane()
    return atom.workspace.openURIInPane(fullSettingsURI, pane)
  },

  /**
   * Updates the settings view and emoji stylesheet.
   * @param {String} The updated value
   * @return {undefined}
   */
  updateEmojiStyle ({ newValue }) {
    updateStyleSheet()
    this.settings.update(newValue)
  },

  /**
   * Parses the current path and opens the settings view
   * if matching the settings URI.
   * @param  {String} atomPath
   * @return {Object}
   */
  validateOpener (atomPath) {
    const { base } = path.parse(atomPath)
    if (
      atomPath === fullSettingsURI ||
      base === fullSettingsURI ||
      atomPath.includes(fullSettingsURI)
    ) {
      return atom.views.getView(this.settings)
    }
  },

  /**
   * Registeres the settings view to Atom's view provider.
   * @return {undefined}
   */
  registerView () {
    atom.views.addViewProvider(EmojiSettings, (emojiSettings) => {
      const $settings = new SettingsElement()
      $settings.initialize(emojiSettings)
      return $settings
    })
  }
}
