'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'TypeScript'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--ts'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'function': {
		internalSettings: {
			selector: '.syntax--function.syntax--type:not(.syntax--parameter):not(.syntax--return)'
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
			selector: '.syntax--meta.syntax--method .syntax--entity.syntax--name'
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
			selector: '.syntax--meta.syntax--class > .syntax--interface:first-child'
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
			selector: '.syntax--meta.syntax--expr.syntax--var > .syntax--storage.syntax--type'
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
