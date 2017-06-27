/** @babel */

import { getLanguageSettings } from '../helpers'

const name = 'PHP'
const language = {
  internalSettings: {
    selector: [
      '.syntax--source.syntax--php'
    ],
    supported: [
      'language-php'
    ]
  },
  userSettings: {
    active: true
  }
}
const properties = {
  'function': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--function.syntax--type'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'after',
      spacing: false
    }
  },
  'output': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--construct.syntax--output'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📰',
      pseudo: 'before',
      spacing: true
    }
  },
  'namespace': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--keyword.syntax--other.syntax--namespace'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔖',
      pseudo: 'before',
      spacing: true
    }
  },
  'interface': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--storage.syntax--type.syntax--interface'
      ]
    },
    userSettings: {
      active: true,
      emoji: '💿',
      pseudo: 'after',
      spacing: true
    }
  },
  'include': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--keyword.syntax--control.syntax--import.syntax--include'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📥',
      pseudo: 'after',
      spacing: true
    }
  },
  'goto': {
    internalSettings: {
      selector: [
        // language-php (github.com/atom/language-php)
        '.syntax--keyword.syntax--control.syntax--goto'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🚀',
      pseudo: 'after',
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
