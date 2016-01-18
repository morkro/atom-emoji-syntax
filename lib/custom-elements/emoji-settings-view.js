'use babel';

// Systemm
import { CompositeDisposable } from 'atom';
// Helpers
import { getLanguage, getAllLanguages } from '../helpers/get-all-languages';
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
// Package core
import EmojiKeywordView from './emoji-keyword-view';
import { updateStyleSheet } from '../stylesheet';

class EmojiSettingsView extends HTMLElement {
   createdCallback () {
      this.languages = getAllLanguages(true);
      this.project = null;
      this.viewTitle = 'Emoji Syntax: Settings';
      this.iconName = 'emoji-syntax';
      this.subscriptions = new CompositeDisposable();
   }

   createHeader () {
      const header = createNode('header', {
         className: 'emoji-settings-header'
      });
      const toggleLanguages = createNode('button', {
         className: ['btn', 'toggle-languages'],
         textContent: 'Toggle all languages'
      });

      header.appendChild( toggleLanguages );
      header.addEventListener('click', this.toggleColumns);

      return header;
   }

   createSettingsPanel (data = {}) {
      const wrapper = createNode('atom-panel', {
         className: ['top', 'inset-panel'],
         attributes: { 'data-emoji-language': data.languageName.toLowerCase() }
      });
      const activeButton = (data.active) ? 'btn-primary selected' : '';

      wrapper.innerHTML = HTML`
         <div class="panel-heading">
            <div class="panel-group">
               <button class="btn-toggle-language btn btn-sm icon icon-check ${activeButton}"></button>
               <h2 class="inline-block">${data.languageName}</h2>
            </div>
         </div>
         <div class="panel-body"></div>
      `;

      // Default options comes with a later release.
      // <button class="btn-set-default btn inline-block-tight">Set to default</button>

      if (!data.active) {
         wrapper.classList.add('is-inactive');
         wrapper.classList.add('is-collapsed');
      }

      wrapper.querySelector('.panel-heading')
         .addEventListener('click', this.managePanelItem);

      Object.keys(data).forEach(lang => {
         if (data[lang].emoji) {
            let keyword = new EmojiKeywordView();
            keyword.initialize({
               language: data.languageName,
               selector: data.languageSelector,
               keyword: lang,
               content: data[lang]
            });
            // Grab dat .panel-body
            return wrapper.children[1].appendChild(keyword);
         }
      });

      return wrapper;
   }

   managePanelItem (event) {
      let target = event.target;
      let isElement = target instanceof HTMLElement;
      let language = null;

      if (isElement && target.nodeName === 'H2') {
         this.parentNode.classList.toggle('is-collapsed');
      }
      else if (isElement && target.classList.contains('btn-toggle-language')) {
         language = getLanguage(this.parentNode.getAttribute('data-emoji-language'));

         this.parentNode.classList.toggle('is-collapsed');
         this.parentNode.classList.toggle('is-inactive');

         target.classList.toggle('btn-primary');
         target.classList.toggle('selected');

         language.set('active', !!target.classList.contains('selected'));
         updateStyleSheet();
      }
      // Default options comes with a later release.
      // else if (isElement && target.classList.contains('btn-set-default')) {
      //    language = getLanguage(this.parentNode.getAttribute('data-emoji-language'));
      // }
   }

   toggleColumns (event) {
      const panels = this.parentNode.querySelectorAll('atom-panel');
      
      if (event.target.classList.contains('toggle-languages')) {
         [].forEach.call(panels, item => {
            if (!item.classList.contains('is-collapsed')) {
               item.classList.add('is-collapsed');
            }
            else {
               item.classList.remove('is-collapsed');
            }
         });
      }
   }

   initialize (project) {
      this.project = project;
      this.appendChild( this.createHeader() );
      this.languages.forEach(
         lang => this.appendChild( this.createSettingsPanel(lang) )
      );
   }

   serialize () {}
   getTitle () { return this.viewTitle; }
   getIconName () { return this.iconName; }
}

export default EmojiSettingsView = document.registerElement('emoji-settings',
   { prototype: EmojiSettingsView.prototype }
);
