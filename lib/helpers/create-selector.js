'use babel';

/**
 * Creates a single CSS selector string.
 *
 * @param {String} language - The language specific CSS selector
 * @param {Object} config - Configuration
 * @param {String} config.selector - Selector of the keyword used by Atom
 * @param {String} config.emoji - Must be unicode character
 * @param {String} config.pseudo - Determines the position of the emoji
 * @param {Boolean} config.spacing - Bool if the emoji should have spacing
 *
 * @return {String} The computed selector string
 */
export default function createSelector (language, config = {}) {
	const lang = language;
	const { selector, emoji, pseudo, spacing: hasSpacing } = config;
	let margin = '';

	if (hasSpacing && pseudo === 'after') {
		margin = 'margin-left: 0.5em;';
	}
	else if (hasSpacing && pseudo === 'before') {
		margin = 'margin-right: 0.5em;';
	}

	return `${lang} ${selector}::${pseudo} {
		content: "${emoji}";
		${margin}
	}`;
}
