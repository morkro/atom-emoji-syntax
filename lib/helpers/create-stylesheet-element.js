'use babel';

/**
 * Creates a <style> element based on Atom's "atom.styles.addStyleSheet()".
 * @param  {String} source  [The stylesheet's content]
 * @param  {Object} options [Configuration options based on Atom's function]
 * @return {Object}         [The <style> element]
 */
export default function createStyleSheet (source, {
	selector = 'emoji-syntax-stylesheet',
	context = 'atom-text-editor',
	priority = 2
} = {}) {
	const styleSheet = document.createElement('style');

	styleSheet.textContent = source;
	styleSheet.classList.add(selector);
	styleSheet.context = context;
	styleSheet.setAttribute('context', context);
	styleSheet.priority = priority;
	styleSheet.setAttribute('priority', priority);

	return styleSheet;
}
