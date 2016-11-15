'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'PHP'
const language = {
	internalSettings: {
		selector: '.source.php'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'function': {
		internalSettings: {
			selector: '.function.type'
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
			selector: '.construct.output'
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
			selector: '.keyword.other.namespace'
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
			selector: '.storage.type.interface'
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
			selector: '.keyword.control.import.include'
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
			selector: '.keyword.control.goto'
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
	internalSettings: Object.assign({},
		language.internalSettings,
		getLanguageSettings(properties, 'internalSettings')
	),
	userSettings: Object.assign({},
		language.userSettings,
		getLanguageSettings(properties, 'userSettings')
	)
}
