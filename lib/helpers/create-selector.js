'use babel';

/**
 * Creates a single CSS selector string.
 * @param  {String} language [The language specific CSS selector]
 * @param  {Object} config   [Configuration]
 * @return {String}          [The computed selector string]
 */
export default function createSelector (language, config = {}) {
	const lang = language;
	const { selector, pseudo, spacing: hasSpacing } = config;
	let { emoji } = config;

	if (hasSpacing && pseudo === 'after') {
		emoji = ` ${emoji}`;
	}
	else if (hasSpacing && pseudo === 'before') {
		emoji = `${emoji} `;
	}

	return `${lang} ${selector}::${pseudo} { content: "${emoji}"; }`;
}
