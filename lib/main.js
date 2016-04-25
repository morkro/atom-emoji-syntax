'use babel';

// System
import url from 'url';
import { CompositeDisposable } from 'atom';
// Data
import configSchema from './config-schema.json';
import uri from './uri';
// Package core
import EmojiSettings from './emoji-settings';
import EmojiSettingsView from './custom-elements/emoji-settings-view';
import {
	removeStyleSheet,
	addStyleSheet,
	hasStyleSheet
} from './stylesheet';

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
const EmojiSyntax = {
	config: configSchema,
	subscriptions: null,
	settingsView: null,

	/**
	 * Adds the stylesheet, commands and listeners.
	 * @param  {Object} state
	 * @return {[type]}       [description]
	 */
	activate (state) {
		this.subscriptions = new CompositeDisposable();
		this.settingsView = this.createSettingsView(state.settings);

		addStyleSheet();

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'emoji-syntax:settings': this.openSettings,
				'emoji-syntax:toggle': this.toggleSyntax
			})
		);

		return atom.workspace.addOpener(this.validateOpener.bind(this));
	},

	/**
	 * Diposes all added subscriptions and removes stylesheet.
	 * @return {undefined}
	 */
	deactivate () {
		this.subscriptions.dispose();
		return removeStyleSheet();
	},

	/**
	 * Serialises the package's lifecycle.
	 * @return {Object}
	 */
	serialize () {
		return {
			settings: this.settingsView.serialize()
		};
	},

	/**
	 * Toggles the stylesheets.
	 * @return {Boolean}
	 */
	toggleSyntax () {
		if (hasStyleSheet()) {
			return removeStyleSheet();
		}

		return addStyleSheet();
	},

	/**
	 * Either restores the settings view from a previous session
	 * or creates a new one.
	 * @param  {String} settings
	 * @return {Object}
	 */
	createSettingsView (settings) {
		if (settings && settings.style) {
			return atom.deserializers.deserialize(settings);
		}
		return new EmojiSettings({
			style: atom.config.get('emoji-syntax.emojiStyles')
		});
	},

	/**
	 * Returns a new pane element.
	 * @return {Void}
	 */
	openSettings () {
		const fullSettingsURI = uri.protocol + uri.settings;
		let pane = atom.workspace.paneForURI(fullSettingsURI);
		pane = pane || atom.workspace.getActivePane();
		return atom.workspace.openURIInPane(fullSettingsURI, pane, {});
	},

	/**
	 * Parses the current path and opens the settings view
	 * if matching the settings URI.
	 * @param  {String} path
	 * @return {Object}
	 */
	validateOpener (path) {
		const parsedPath = url.parse(path);
		const protocol = parsedPath.protocol;
		const host = parsedPath.host;

		if (protocol !== uri.protocol) {
			return;
		}

		if (host === uri.settings) {
			return atom.views.getView(this.settingsView);
		}
	},

	/**
	 * Registeres the settings view to Atom's view provider.
	 */
	registerView () {
		atom.views.addViewProvider(EmojiSettings, data => {
			const view = new EmojiSettingsView();
			view.initialize(data);
			return view;
		});
	}
};

EmojiSyntax.registerView();

export default EmojiSyntax;
