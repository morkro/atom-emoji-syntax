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
   removeStyleSheet, addStyleSheet, updateStyleSheet, hasStyleSheet
} from './stylesheet';

const EmojiSyntax = {
   config: configSchema,
   subscriptions: null,
   settingsView: null,

   activate: function(state) {
      this.subscriptions = new CompositeDisposable();
      this.settingsView = new EmojiSettings();

      addStyleSheet();

      this.subscriptions.add( atom.commands.add('atom-workspace', {
         'emoji-syntax:settings': this.openSettings,
         'emoji-syntax:toggle': this.toggleSyntax
      }) );

      this.subscriptions.add(
         atom.config.onDidChange('emoji-syntax', () => updateStyleSheet)
      );

      return atom.workspace.addOpener(this.validateOpener.bind(this));
   },

   deactivate: function() {
      this.subscriptions.dispose();
      return removeStyleSheet();
   },

   toggleSyntax: function() {
      if (hasStyleSheet()) {
         return removeStyleSheet();
      }
      else {
         return addStyleSheet();
      }
   },

   openSettings: function() {
      const fullSettingsURI = uri.protocol + uri.settings;
      let pane = atom.workspace.paneForURI( fullSettingsURI );
      pane = pane || atom.workspace.getActivePane();
      return atom.workspace.openURIInPane(fullSettingsURI, pane, {});
   },

   validateOpener: function(path) {
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

   registerView: function() {
      return atom.views.addViewProvider(EmojiSettings, model => {
         const view = new EmojiSettingsView();
         view.initialize(model);
         return view;
      });
   }
};

EmojiSyntax.registerView();

export default EmojiSyntax;
