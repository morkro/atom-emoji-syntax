'use babel'
/* eslint-env jasmine */

import * as _ from '../lib/language-data'
import { python } from '../lib/languages'

describe('Working with language objects', () => {
  beforeEach(() => {
    atom.packages.activatePackage('emoji-syntax')
    _.setLanguageStore()
  })

  afterEach(() => {
    atom.packages.deactivatePackage('emoji-syntax')
  })

  it('getAllLanguages() returns filtered & unfiltered language objects', () => {
    const allLanguages = _.getAllLanguages()
    expect(Array.isArray(allLanguages)).toBe(true)
    expect(allLanguages.length).toBeGreaterThan(0)

    const filteredLanguages = _.getAllLanguages({ filtered: true })
    filteredLanguages.forEach(lang => expect(lang.userSettings.all.active).toBe(true))
  })

  it('returns the correct language', () => {
    const javascript = _.getLanguage('javascript')
    expect(javascript.name).toContain('JavaScript')
  })

  it('default settings are correct', () => {
    const defaultSettings = _.getDefaultSettings('python')
    Object.keys(defaultSettings).forEach(setting => {
      expect(
        Object.is(defaultSettings[setting], python.userSettings[setting])
      ).toBe(true)
    })
  })
})
