'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'Python'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--python'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'import': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--import.syntax--python'
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
			selector: '.syntax--storage.syntax--modifier.syntax--global.syntax--python'
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
