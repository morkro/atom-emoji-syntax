'use babel'

import languages from '../lib/language-data'

describe('Receiving language objects', () => {
	const allLanguages = languages.getAll()
	const specificLanguage = languages.get('javascript')

	it('returned all available language objects', () => {
		expect(allLanguages.length).toBeGreaterThan(0)
		expect(Array.isArray(allLanguages)).toBe(true)
	})

	it('returns the correct language', () => {
		expect(specificLanguage.all.languageName).toContain('JavaScript')
	})
})
