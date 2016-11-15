'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'CSS'
const language = {
	internalSettings: {
		selector: '.source.css'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'@import': {
		internalSettings: {
			selector: '.keyword.at-rule.import'
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
			selector: '.keyword.at-rule.media'
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
			selector: '.keyword.at-rule.keyframes'
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
			selector: '.keyword.at-rule.font-face'
		},
		userSettings: {
			active: true,
			emoji: '📖',
			pseudo: 'before',
			spacing: true
		}
	},
	'!important': {
		internalSettings: {
			selector: '.keyword.important'
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
