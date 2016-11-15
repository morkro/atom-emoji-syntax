'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'SCSS'
const language = {
	internalSettings: {
		selector: '.source.css.scss'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'@mixin': {
		internalSettings: {
			selector: '.keyword.at-rule.mixin'
		},
		userSettings: {
			active: true,
			emoji: '✨',
			pseudo: 'before',
			spacing: true
		}
	},
	'@for': {
		internalSettings: {
			selector: '.keyword.control.for'
		},
		userSettings: {
			active: true,
			emoji: '👟',
			pseudo: 'before',
			spacing: true
		}
	},
	'@font-face': {
		internalSettings: {
			selector: '.keyword.at-rule.fontface'
		},
		userSettings: {
			active: true,
			emoji: '📖',
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
	'@function': {
		internalSettings: {
			selector: '.keyword.at-rule.function'
		},
		userSettings: {
			active: true,
			emoji: '🔧',
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
