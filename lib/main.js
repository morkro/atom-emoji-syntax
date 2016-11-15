'use babel'

// System
import url from 'url'
import { CompositeDisposable } from 'atom'
// Data
import config from './config-schema.json'
import uri from './constants/uri'
// Package core
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

/**
 * The package main object.
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

		setLanguageStore()
		addStyleSheet()
		this.addSubscriptions()
		this.registerView()

		return atom.workspace.addOpener(this.validateOpener.bind(this))
	},

	/**
	 * Diposes all added subscriptions and removes stylesheet.
	 * @return {undefined}
	 */
	deactivate () {
		this.subscriptions.dispose()
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
		const { PROTOCOL, SETTINGS } = uri
		const fullSettingsURI = PROTOCOL + SETTINGS
		let pane = atom.workspace.paneForURI(fullSettingsURI)
		pane = pane || atom.workspace.getActivePane()
		return atom.workspace.openURIInPane(fullSettingsURI, pane, {})
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
	 * @param  {String} path
	 * @return {Object}
	 */
	validateOpener (path) {
		const { protocol, host } = url.parse(path)
		const { PROTOCOL, SETTINGS } = uri

		if (protocol !== PROTOCOL) {
			return
		}

		if (host === SETTINGS) {
			return atom.views.getView(this.settings)
		}
	},

	/**
	 * Registeres the settings view to Atom's view provider.
	 * @return {undefined}
	 */
	registerView () {
		atom.views.addViewProvider(EmojiSettings, (emojiSettings) => {
			const settings = new SettingsElement()
			settings.initialize(emojiSettings)
			return settings
		})
	}
}
