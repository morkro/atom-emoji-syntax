'use babel'

// System
import url from 'url'
import { CompositeDisposable } from 'atom'
// Data
import config from './config-schema.json'
import uri from './uri'
// Package core
import EmojiSettings from './emoji-settings'
import SettingsElement from './custom-elements/emoji-settings'
import EmojiStyleSheet from './stylesheet'
import { setLanguageStore } from './language-data'

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
const EmojiSyntax = {
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
		EmojiStyleSheet.add()

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'emoji-syntax:settings': this.openSettings,
				'emoji-syntax:toggle': this.toggleSyntax
			}),
			atom.config.onDidChange(
				'emoji-syntax.emojiStyles',
				this.updateEmojiStyle.bind(this)
			)
		)

		return atom.workspace.addOpener(this.validateOpener.bind(this))
	},

	/**
	 * Diposes all added subscriptions and removes stylesheet.
	 * @return {undefined}
	 */
	deactivate () {
		this.subscriptions.dispose()
		if (this.settings) this.settings.dispose()
		return EmojiStyleSheet.remove()
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
	 * Toggles the stylesheets.
	 * @return {Boolean}
	 */
	toggleSyntax () {
		if (EmojiStyleSheet.exists()) {
			return EmojiStyleSheet.remove()
		}

		return EmojiStyleSheet.add()
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
		const fullSettingsURI = uri.protocol + uri.settings
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
		EmojiStyleSheet.update()
		this.settings.update(newValue)
	},

	/**
	 * Parses the current path and opens the settings view
	 * if matching the settings URI.
	 * @param  {String} path
	 * @return {Object}
	 */
	validateOpener (path) {
		const parsedPath = url.parse(path)
		const { protocol, host } = parsedPath

		if (protocol !== uri.protocol) {
			return
		}

		if (host === uri.settings) {
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

EmojiSyntax.registerView()

export default EmojiSyntax
