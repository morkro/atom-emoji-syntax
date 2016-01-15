'use babel';

/**
 * Creates an HTML template string and returns it.
 * @param  {String} template [The HTML string written in template strings]
 * @return {String} result   [The new string]
 */
export default function HTML (template) {
   let result = template[0];

   for (let i = 1; i < arguments.length; i++) {
      let arg = String(arguments[i]);
      result += arg.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
      result += template[i];
   }

   return result;
}
