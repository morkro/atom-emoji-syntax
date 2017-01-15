'use babel'

import { getLanguageSettings } from '../helpers'

const name = 'SCSS'
const language = {
	internalSettings: {
		selector: '.syntax--source.syntax--css.syntax--scss'
	},
	userSettings: {
		active: true
	}
}
const properties = {
	'@mixin': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--mixin'
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
			selector: '.syntax--keyword.syntax--control.syntax--for'
		},
		userSettings: {
			active: true,
			emoji: '👟',
			pseudo: 'before',
			spacing: true
		}
	},
	'@each': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--control.syntax--each'
		},
		userSettings: {
			active: true,
			emoji: '👣',
			pseudo: 'before',
			spacing: true
		}
	},
	'@font-face': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--at-rule.syntax--fontface'
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
			selector: '.syntax--keyword.syntax--at-rule.syntax--keyframes'
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
			selector: '.syntax--keyword.syntax--at-rule.syntax--function'
		},
		userSettings: {
			active: true,
			emoji: '🔧',
			pseudo: 'before',
			spacing: true
		}
	},
	'@while': {
		internalSettings: {
			selector: '.syntax--keyword.syntax--control.syntax--while'
		},
		userSettings: {
			active: true,
			emoji: '🕯',
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
