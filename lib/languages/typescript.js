/** @babel */

import { getLanguageSettings } from '../helpers'

const name = 'TypeScript'
const language = {
  internalSettings: {
    selector: [
      '.syntax--source.syntax--ts',
      '.syntax--source.syntax--tsx'
    ],
    supported: [
      'atom-typescript'
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
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--meta.syntax--import .syntax--keyword:first-child'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📥',
      pseudo: 'before',
      spacing: true
    }
  },
  'export': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--keyword.syntax--control.syntax--export'
      ]
    },
    userSettings: {
      active: true,
      emoji: '📤',
      pseudo: 'after',
      spacing: false
    }
  },
  'class': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
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
  'function': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--function.syntax--type:not(.syntax--parameter):not(.syntax--return)'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'after',
      spacing: false
    }
  },
  'method': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--meta.syntax--method .syntax--entity.syntax--name'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔧',
      pseudo: 'before',
      spacing: true
    }
  },
  'interface': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--meta.syntax--class > .syntax--interface'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🎛',
      pseudo: 'before',
      spacing: true
    }
  },
  'variables': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--meta.syntax--expr.syntax--var > .syntax--storage.syntax--type'
      ]
    },
    userSettings: {
      active: true,
      emoji: '💎',
      pseudo: 'after',
      spacing: true
    }
  },
  'typeof': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
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
        // atom-typescript (github.com/TypeStrong/atom-typescript)
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
  'console': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--console.syntax--support.syntax--class'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🚧',
      pseudo: 'before',
      spacing: true
    }
  },
  'namespace': {
    internalSettings: {
      selector: [
        // atom-typescript (github.com/TypeStrong/atom-typescript)
        '.syntax--storage.syntax--type.syntax--namespace'
      ]
    },
    userSettings: {
      active: true,
      emoji: '🔖',
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
