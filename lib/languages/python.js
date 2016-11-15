'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'Python'
const language = {
	internalSettings: {
		selector: '.source.python'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'import': {
		internalSettings: {
			selector: '.keyword.import.python'
		},
		userSettings: {
			active: true,
			emoji: '📦',
			pseudo: 'before',
			spacing: true
		}
	},
	'global': {
		internalSettings: {
			selector: '.storage.modifier.global.python'
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
	internalSettings: Object.assign({},
		language.internalSettings,
		getLanguageSettings(properties, 'internalSettings')
	),
	userSettings: Object.assign({},
		language.userSettings,
		getLanguageSettings(properties, 'userSettings')
	)
}
