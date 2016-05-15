'use babel';

import languages from '../lib/get-languages';

describe('Receiving language objects', () => {
	const allLanguages = languages.getAll();
	const specificLanguage = languages.get('javascript');

	it('returned all available language objects', () => {
		expect(allLanguages.length).toBeGreaterThan(0);
		expect(allLanguages instanceof Array).toBe(true);
	});

	it('returns the correct language', () => {
		expect(specificLanguage.all.languageName).toContain('JavaScript');
	});
});
