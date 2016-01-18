'use babel';

/**
 * Creates a HTML element, adds options and returns it
 * @param  {String} tagName [The tag name of the element]
 * @param  {Object} options [Options which are added to the element. Must
 *                          be valid DOM API like textContent, className, id,
 *                          data-attributes, ...]
 * @return {Object}         [The HTMLElement]
 */
export default function createNode (tagName, options = {}) {
   const element = document.createElement(tagName);

   // add text content
   if (options.textContent) {
      element.appendChild( document.createTextNode(options.textContent) );
   }
   // add the id (id="something")
   if (options.id) element.id = options.id;
   // add a class name (class="something")
   if (options.className) {
      if (options.className instanceof Array) {
         DOMTokenList.prototype.add.apply(element.classList, options.className);
      }
      else {
         element.classList.add(options.className);
      }
   }
   // add all data attributes (data-something="value")
   if (options.attributes && typeof options.attributes === 'object') {
      Object.keys(options.attributes).forEach(
         attr => element.setAttribute(attr, options.attributes[attr])
      );
   }
   // append child nodes
   if (options.append) element.appendChild(options.append);

   return element;
}
