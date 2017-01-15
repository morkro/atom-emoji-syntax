'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'CSS'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--css'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'@import': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--import'
		},
		userSettings: {
			active: true,
			emoji: '📦',
			pseudo: 'before',
			spacing: true
		}
	},
	'@media': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--media'
		},
		userSettings: {
			active: true,
			emoji: '💻',
			pseudo: 'before',
			spacing: true
		}
	},
	'@keyframes': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--keyframes'
		},
		userSettings: {
			active: true,
			emoji: '📹',
			pseudo: 'before',
			spacing: true
		}
	},
	'@font-face': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--font-face'
		},
		userSettings: {
			active: true,
			emoji: '📖',
			pseudo: 'before',
			spacing: true
		}
	},
	'@namespace': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--namespace'
		},
		userSettings: {
			active: true,
			emoji: '🔖',
			pseudo: 'before',
			spacing: true
		}
	},
	'@charset': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--charset'
		},
		userSettings: {
			active: true,
			emoji: '🔣',
			pseudo: 'before',
			spacing: true
		}
	},
	'!important': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--important'
		},
		userSettings: {
			active: true,
			emoji: '🚨',
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
