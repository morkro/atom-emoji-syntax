'use babel';

// Helper
import createNode from '../helpers/create-node';
import HTML from '../helpers/create-html';
import isEmoji from '../helpers/is-emoji';
import { getLanguage, getAllLanguages } from '../helpers/get-all-languages';
import getLanguageSelectors from '../helpers/get-language-selectors';
import createStyleSheet from '../helpers/create-stylesheet-element';
// Package core
import { updateStyleSheet } from '../stylesheet';

class EmojiKeywordView extends HTMLElement {
   createdCallback () {
      this.innerHTML = HTML`
         <h3><code></code></h3>
         <div class="emoji-options"></div>
      `;

      // Preview comes in a later version.
      // <atom-text-editor class="emoji-preview" data-grammar="source js" style></atom-text-editor>
      // this.preview = this.querySelector('.emoji-preview');
      this.keywordName = this.querySelector('h3 code');
      this.optionsWrap = this.querySelector('.emoji-options');
   }

   createInputOption (name, value) {
      let wrapper = createNode('div', { className: ['block', 'option-emoji'] });

      wrapper.innerHTML = HTML`
         <div>${name}:</div><atom-text-editor mini class="inline-block">${value}</atom-text-editor>
      `;

      return wrapper;
   }

   createPseudoOption (name, value) {
      let wrapper = createNode('div', { className: ['block', 'option-pseudo'] });
      let isBeforeSelected = (value === 'before') ? 'selected' : '';
      let isAfterSelected = (value !== 'before') ? 'selected' : '';

      wrapper.innerHTML = HTML`
         <div>${name}:</div>
         <div class="btn-group">
            <button
            class="btn ${isBeforeSelected} emoji-toggle-position"
            data-emoji-position="before">Before</button>
            <button
            class="btn ${isAfterSelected} emoji-toggle-position"
            data-emoji-position="after">After</button>
         </div>
      `;

      return wrapper;
   }

   createCheckboxOption (name, value) {
      let wrapper = createNode('div', { className: 'block' });
      let isSelected = (value === true) ? 'btn-primary' : '';

      if (name !== 'Active') {
         wrapper.classList.add('option-spacing');
         wrapper.innerHTML = HTML`
            <div>${name}:</div>
            <button data-emoji-option="spacing"
            class="emoji-toggle-active btn btn-sm ${isSelected} icon icon-check"></button>
         `;
      }
      else {
         wrapper.classList.add('option-activate');
         wrapper.innerHTML = HTML`
            <button data-emoji-option="active"
            class="emoji-toggle-active btn btn-sm ${isSelected} icon icon-check"></button>
         `;
      }

      return wrapper;
   }

   getPreviewCode (options = {}) {
      this.preview.textContent = 'function () {}';
      //DOMTokenList.prototype.add.apply(this.preview.classList, options.selector);
   }

   manageSettingsData (event) {
      const target = event.target;
      const isElement = target instanceof HTMLElement;

      if (isElement && target.classList.contains('emoji-toggle-active')) {
         target.classList.toggle('btn-primary');

         this.updateLanguage({
            lang: this.getAttribute('data-emoji-language'),
            keyword: this.getAttribute('data-emoji-keyword'),
            property: target.getAttribute('data-emoji-option'),
            newValue: !!target.classList.contains('btn-primary')
         });
      }
      else if (isElement && target.classList.contains('emoji-toggle-position')) {
         if (target.getAttribute('data-emoji-position') === 'before') {
            target.nextElementSibling.classList.remove('selected');
         }
         else if (target.getAttribute('data-emoji-position') === 'after') {
            target.previousElementSibling.classList.remove('selected');
         }
         target.classList.add('selected');

         this.updateLanguage({
            lang: this.getAttribute('data-emoji-language'),
            keyword: this.getAttribute('data-emoji-keyword'),
            property: 'pseudo',
            newValue: target.getAttribute('data-emoji-position')
         });
      }
   }

   manageEmojiSettings (event) {
      const strictEmojiMode = atom.config.get('emoji-syntax').strictEmojiMode;
      const target = event.target;
      let editor = null;
      let newValue = '';

      if (target.nodeName === 'ATOM-TEXT-EDITOR') {
         editor = target.getModel();

         if (
            event.type === 'keyup' &&
            strictEmojiMode &&
            !isEmoji(editor.getText())
         ) {
            target.classList.add('is-error');
         }
         else {
            target.classList.remove('is-error');
            this.updateLanguage({
               lang: this.getAttribute('data-emoji-language'),
               keyword: this.getAttribute('data-emoji-keyword'),
               property: 'emoji',
               newValue: editor.getText()
            });
         }
      }
   }

   updateLanguage (options = {}) {
      const language = getLanguage(options.lang);
      language.set(`${options.keyword}.${options.property}`, options.newValue);
      updateStyleSheet();
   }

   initialize (options = {}) {
      const selectorToArray = options.selector.split('.').splice(1);
      
      Object.keys(options.content).forEach(item => {
         let optionsName = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
         let listItem = null;

         if (item === 'emoji') {
            listItem = this.createInputOption(optionsName, options.content[item]);
         }
         else if (item === 'pseudo') {
            listItem = this.createPseudoOption(optionsName, options.content[item]);
         }
         else if (item === 'active' || item === 'spacing') {
            listItem = this.createCheckboxOption(optionsName, options.content[item]);
         }

         if (item !== 'selector' && listItem !== null) {
            this.optionsWrap.appendChild( listItem );
         }
      });

      // Preview comes in a later version.
      // this.getPreviewCode({
      //    selector: selectorToArray,
      //    keyword: options.keyword
      // });

      this.keywordName.innerHTML = options.keyword.toLowerCase();
      this.setAttribute('data-emoji-language', options.language.toLowerCase());
      this.setAttribute('data-emoji-keyword', options.keyword.toLowerCase());
      this.addEventListener('click', this.manageSettingsData);
      this.addEventListener('keydown', this.manageEmojiSettings);
      this.addEventListener('keyup', this.manageEmojiSettings);
   }
}

export default EmojiKeywordView = document.registerElement('emoji-keyword',
   { prototype: EmojiKeywordView.prototype }
);
