module.exports = {
	active: true,
	languageName: 'CSS',
	languageSelector: '.source.css',
	'@import': {
		active: true,
		emoji: '📦',
		selector: '.keyword.at-rule.import',
		pseudo: 'before',
		spacing: true
	},
	'@media': {
		active: true,
		emoji: '💻',
		selector: '.keyword.at-rule.media',
		pseudo: 'before',
		spacing: true
	},
	'@keyframes': {
		active: true,
		emoji: '📹',
		selector: '.keyword.at-rule.keyframes',
		pseudo: 'before',
		spacing: true
	},
	'@font-face': {
		active: true,
		emoji: '📖',
		selector: '.keyword.at-rule.font-face',
		pseudo: 'before',
		spacing: true
	},
	'!important': {
		active: true,
		emoji: '🚨',
		selector: '.keyword.important',
		pseudo: 'after',
		spacing: true
	}
}
