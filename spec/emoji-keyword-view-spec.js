'use babel';

import EmojiKeywordView from '../lib/custom-elements/emoji-keyword-view';
import { getLanguage } from '../lib/helpers/get-all-languages';

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

   it('has all DOM elements available', () => {
      expect(element).toBeDefined();
      expect(element.querySelector('h3 code')).toBeDefined();
      expect(element.querySelector('.emoji-options')).toBeDefined();
      expect(element.querySelector('.option-activate')).toBeDefined();
      expect(element.querySelector('.option-emoij')).toBeDefined();
      expect(element.querySelector('.option-pseudo')).toBeDefined();
      expect(element.querySelector('.option-spacing')).toBeDefined();
   });
});
