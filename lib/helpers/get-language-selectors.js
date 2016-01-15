'use babel';

import createSelector from './create-selector';
import { getAllLanguages } from './get-all-languages';

/**
 * Loops over a language object and creates the respective stylesheet.
 * @return {String}        [The stylesheet as string]
 */
export default function getAllLanguageselectors () {
   const languages = getAllLanguages();
   let stylesheet = '';

   languages.forEach(lang => {
      let selector = lang.languageSelector;

      for (var item in lang) {
         if (lang.hasOwnProperty(item) && lang[item].active && lang[item].emoji) {
            stylesheet += createSelector(selector, {
               emoji: lang[item].emoji,
               selector: lang[item].selector,
               pseudo: lang[item].pseudo,
               spacing: lang[item].spacing
            });
         }
      }
   });

   return stylesheet;
}
