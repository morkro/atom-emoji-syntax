/** @babel */

import { getLanguageSettings } from '../helpers'

const name = 'JavaScript'
const language = {
  internalSettings: {
    selector: [
      '.syntax--source.syntax--js',
      '.syntax--source.syntax--js.syntax--jsx'
    ],
    supported: [
      'language-javascript',
      'language-babel'
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
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--meta.syntax--import .syntax--keyword:first-child',
        // JSX syntax
        '.syntax--keyword.syntax--control:not(.syntax--switch):first-of-type',
        // language-babel (github.com/gandm/language-babel)
        '.syntax--module.syntax--control.syntax--keyword:first-of-type'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📦',
      pseudo: 'before',
      spacing: true
    }
  },
  'export': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--meta.syntax--export .syntax--keyword:first-child'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📦',
      pseudo: 'before',
      spacing: true
    }
  },
  'default': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--variable.syntax--default'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔸',
      pseudo: 'after',
      spacing: true
    }
  },
  'class': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--storage.syntax--type.syntax--class:not(.syntax--jsdoc)'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🏷',
      pseudo: 'after',
      spacing: false
    }
  },
  'delete': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--keyword.syntax--operator.syntax--delete'
      ]
    },
    userSettings: {
      active: true,
      emoji: '💣',
      pseudo: 'before',
      spacing: true
    }
  },
  'function': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--function.syntax--type:not(.syntax--arrow)'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'after',
      spacing: false
    }
  },
  'arrow': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--function.syntax--arrow.syntax--type'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'before',
      spacing: true
    }
  },
  'typeof': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--keyword.syntax--operator.syntax--typeof'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔬',
      pseudo: 'before',
      spacing: true
    }
  },
  'instanceof': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--keyword.syntax--operator.syntax--instanceof'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔬',
      pseudo: 'before',
      spacing: true
    }
  },
  'yield': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--control.syntax--yield .syntax--keyword'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📣',
      pseudo: 'before',
      spacing: true
    }
  },
  'console': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--console.syntax--entity.syntax--name'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🚧',
      pseudo: 'before',
      spacing: true
    }
  },
  'method': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--meta.syntax--method .syntax--entity.syntax--name'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔮',
      pseudo: 'before',
      spacing: true
    }
  },
  'const': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--storage.syntax--type.syntax--const'
      ]
    },
    userSettings: {
      active: true,
      emoji: '💎',
      pseudo: 'after',
      spacing: true
    }
  },
  'var': {
    internalSettings: {
      selector: [
        // language-javascript (github.com/atom/language-javascript)
        '.syntax--storage.syntax--type.syntax--var'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🌀',
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
