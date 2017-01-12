'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'PHP'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--php'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'function': {
		internalSettings: {
			selector: '.syntax--function.syntax--type'
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
			selector: '.syntax--construct.syntax--output'
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
			selector: '.syntax--keyword.syntax--other.syntax--namespace'
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
			selector: '.syntax--storage.syntax--type.syntax--interface'
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
			selector: '.syntax--keyword.syntax--control.syntax--import.syntax--include'
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
			selector: '.syntax--keyword.syntax--control.syntax--goto'
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
