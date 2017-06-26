/** @babel */

import { getLanguageSettings } from '../helpers'

const name = 'Python'
const language = {
  internalSettings: {
    selector: [
      '.syntax--source.syntax--python'
    ],
    supported: [
      'language-python'
    ]
  },
  userSettings: {
    active: true
  }
}
const properties = {
  'import': {
    internalSettings: {
      selector: [
        // language-python (github.com/atom/language-python)
        '.syntax--keyword.syntax--import.syntax--python'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📦',
      pseudo: 'before',
      spacing: true
    }
  },
  'def': {
    internalSettings: {
      selector: [
        // language-python (github.com/atom/language-python)
        '.syntax--type.syntax--function.syntax--python'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'before',
      spacing: true
    }
  },
  'class': {
    internalSettings: {
      selector: [
        // language-python (github.com/atom/language-python)
        '.syntax--storage.syntax--type.syntax--class'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🏷',
      pseudo: 'after',
      spacing: false
    }
  },
  'global': {
    internalSettings: {
      selector: [
        // language-python (github.com/atom/language-python)
        '.syntax--storage.syntax--modifier.syntax--global.syntax--python'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🌍',
      pseudo: 'before',
      spacing: true
    }
  },
  'nonlocal': {
    internalSettings: {
      selector: [
        // language-python (github.com/atom/language-python)
        '.syntax--storage.syntax--modifier.syntax--nonlocal.syntax--python'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🌍',
      pseudo: 'before',
      spacing: true
    }
  }
}

export default {
  name,
  internalSettings: Object.assign(
    {},
    language.internalSettings,
    getLanguageSettings(properties, 'internalSettings')
  ),
  userSettings: Object.assign(
    {},
    language.userSettings,
    getLanguageSettings(properties, 'userSettings')
  )
}
