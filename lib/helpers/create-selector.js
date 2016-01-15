'use babel';

/**
 * Creates a single CSS selector string.
 * @param  {String} language [The language specific CSS selector]
 * @param  {Object} config   [Configuration]
 * @return {String}          [The computed selector string]
 */
export default function createSelector (language, config = {}) {
   let emoji = config.emoji;
   let lang = language;
   let selector = config.selector;
   let pseudo = config.pseudo || 'before';
   let hasSpacing = config.spacing;

   if (hasSpacing && pseudo === 'after') {
      emoji = ` ${emoji}`;
   }
   else if (hasSpacing && pseudo === 'before') {
      emoji = `${emoji} `;
   }

   return `${lang} ${selector}::${pseudo} { content: "${emoji}"; }`;
}
