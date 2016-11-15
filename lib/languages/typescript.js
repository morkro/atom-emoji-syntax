'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'TypeScript'
const language = {
	internalSettings: {
		selector: '.source.ts'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'function': {
		internalSettings: {
			selector: '.function.type:not(.parameter):not(.return)'
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
			selector: '.meta.method .entity.name'
		},
		userSettings: {
			active: true,
			emoji: '🔧',
			pseudo: 'before',
			spacing: true
		}
	},
	'objects': {
		internalSettings: {
			selector: '.meta.declaration.object > .storage.type:first-child'
		},
		userSettings: {
			active: true,
			emoji: '📀',
			pseudo: 'before',
			spacing: true
		}
	},
	'variables': {
		internalSettings: {
			selector: '.meta.expr.var > .storage.type'
		},
		userSettings: {
			active: true,
			emoji: '💎',
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
