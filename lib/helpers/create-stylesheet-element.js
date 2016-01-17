'use babel';

/**
 * Creates a <style> element based on Atom's "atom.styles.addStyleSheet()".
 * @param  {String} source  [The stylesheet's content]
 * @param  {Object} options [Configuration options based on Atom's function]
 * @return {Object}         [The <style> element]
 */
export default function createStyleSheet (source, options = {}) {
   let styleSheet = document.createElement('style');
   let selector = options.selector || 'emoji-syntax-stylesheet';

   selector = selector.replace(/\./g, '');
   styleSheet.textContent = source;
   styleSheet.classList.add(selector);

   if (options.context !== null) {
      let context = options.context || 'atom-text-editor';
      styleSheet.context = context;
      styleSheet.setAttribute('context', context);
   }

   if (options.priority !== null) {
      let priority = options.priority || 2;
      styleSheet.priority = priority;
      styleSheet.setAttribute('priority', priority);
   }

   return styleSheet;
}
