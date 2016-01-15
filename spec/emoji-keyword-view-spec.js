'use babel';

import EmojiKeywordView from '../lib/custom-elements/emoji-keyword-view';
import { getLanguage } from '../lib/helpers/get-all-languages';

/**
 * @todo Add functional testing. Right now there is only basic DOM testing.
 */
describe('<emoji-keyword>', () => {
   let exampleLanguage = getLanguage('javascript').all;
   let element = new EmojiKeywordView();

   beforeEach(() => {
      element.initialize({
         language: exampleLanguage.languageName,
         selector: exampleLanguage.languageSelector,
         keyword: 'import',
         content: exampleLanguage.import
      });
   });

   it('is correctly created and has all data-attributes', () => {
      expect(element).toBeDefined();

      expect(element.hasAttribute('data-emoji-language')).toBe(true);
      expect(element.getAttribute('data-emoji-language').length).toBeGreaterThan(0);

      expect(element.hasAttribute('data-emoji-keyword')).toBe(true);
      expect(element.getAttribute('data-emoji-keyword').length).toBeGreaterThan(0);
   });

   it('has a headline with content', () => {
      let headline = element.querySelector('h3 code');
      expect(headline).toBeDefined();
      expect(headline.textContent.length).toBeGreaterThan(0);
      expect(headline.textContent).not.toBeUndefined();
   });

   it('contains the options wrapper', () => {
      expect(element.querySelector('.emoji-options')).toBeDefined();
   });

   it('has all options', () => {
      expect(element.querySelector('.option-activate')).toBeDefined();
      expect(element.querySelector('.option-emoij')).toBeDefined();
      expect(element.querySelector('.option-pseudo')).toBeDefined();
      expect(element.querySelector('.option-spacing')).toBeDefined();
   });
});
