'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'JavaScript'
const language = {
	internalSettings: {
		selector: '.source.js'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'import': {
		internalSettings: {
			selector: '.meta.import .keyword:first-child'
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
			selector: '.meta.export .keyword:first-child'
		},
		userSettings: {
			active: true,
			emoji: '📦',
			pseudo: 'before',
			spacing: true
		}
	},
	'delete': {
		internalSettings: {
			selector: '.keyword.operator.delete'
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
			selector: '.function.type:not(.arrow)'
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
			selector: '.function.arrow.type'
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
			selector: '.keyword.operator.typeof'
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
			selector: '.keyword.operator.instanceof'
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
			selector: '.control.yield .keyword'
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
			selector: '.console.entity.name'
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
			selector: '.meta.method .entity.name'
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
			selector: '.storage.modifier'
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
			selector: '.storage.type.var'
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
