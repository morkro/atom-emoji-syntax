'use babel'

import {
	setLanguageStore,
	getLanguage,
	getAllLanguages
} from '../lib/language-data'

describe('Receiving language objects', () => {
	beforeEach(setLanguageStore)

	it('returned all available language objects', () => {
		const allLanguages = getAllLanguages()
		expect(Array.isArray(allLanguages)).toBe(true)
		expect(allLanguages.length).toBeGreaterThan(0)
	})

	it('returns the correct language', () => {
		const specificLanguage = getLanguage('javascript')
		expect(specificLanguage.all.languageName).toContain('JavaScript')
	})
})
