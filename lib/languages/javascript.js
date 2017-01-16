'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'JavaScript'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--js'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'import': {
		internalSettings: {
			selector: '.syntax--meta.syntax--import .syntax--keyword:first-child'
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
			selector: '.syntax--meta.syntax--export .syntax--keyword:first-child'
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
			selector: '.syntax--variable.syntax--default'
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
			selector: '.syntax--storage.syntax--type.syntax--class:not(.syntax--jsdoc)'
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
			selector: '.syntax--keyword.syntax--operator.syntax--delete'
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
			selector: '.syntax--function.syntax--type:not(.syntax--arrow)'
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
			selector: '.syntax--function.syntax--arrow.syntax--type'
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
			selector: '.syntax--keyword.syntax--operator.syntax--typeof'
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
			selector: '.syntax--keyword.syntax--operator.syntax--instanceof'
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
			selector: '.syntax--control.syntax--yield .syntax--keyword'
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
			selector: '.syntax--console.syntax--entity.syntax--name'
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
			selector: '.syntax--meta.syntax--method .syntax--entity.syntax--name'
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
			selector: '> .syntax--storage.syntax--modifier'
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
			selector: '.syntax--storage.syntax--type.syntax--var'
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
	internalSettings: Object.assign({},
		language.internalSettings,
		getLanguageSettings(properties, 'internalSettings')
	),
	userSettings: Object.assign({},
		language.userSettings,
		getLanguageSettings(properties, 'userSettings')
	)
}
