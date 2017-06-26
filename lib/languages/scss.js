/** @babel */

import { getLanguageSettings } from '../helpers'

const name = 'SCSS'
const language = {
  internalSettings: {
    selector: [
      '.syntax--source.syntax--css.syntax--scss'
    ],
    supported: [
      'language-sass'
    ]
  },
  userSettings: {
    active: true
  }
}
const properties = {
  '@mixin': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--at-rule.syntax--mixin'
      ]
    },
    userSettings: {
      active: true,
      emoji: '✨',
      pseudo: 'before',
      spacing: true
    }
  },
  '@for': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--control.syntax--for'
      ]
    },
    userSettings: {
      active: true,
      emoji: '👟',
      pseudo: 'before',
      spacing: true
    }
  },
  '@each': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--control.syntax--each'
      ]
    },
    userSettings: {
      active: true,
      emoji: '👣',
      pseudo: 'before',
      spacing: true
    }
  },
  '@font-face': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--at-rule.syntax--fontface'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📖',
      pseudo: 'before',
      spacing: true
    }
  },
  '@keyframes': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--at-rule.syntax--keyframes'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📹',
      pseudo: 'before',
      spacing: true
    }
  },
  '@function': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--at-rule.syntax--function'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'before',
      spacing: true
    }
  },
  '@while': {
    internalSettings: {
      selector: [
        // language-sass (github.com/atom/language-sass)
        '.syntax--keyword.syntax--control.syntax--while'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🕯',
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
