module.exports = {
	active: true,
	languageName: 'PHP',
	languageSelector: '.source.php',
	'function': {
		active: true,
		emoji: '🔧',
		selector: '.function.type',
		pseudo: 'after',
		spacing: false
	},
	'output': {
		active: true,
		emoji: '📰',
		selector: '.construct.output',
		pseudo: 'before',
		spacing: true
	},
	'namespace': {
		active: true,
		emoji: '🔖',
		selector: '.keyword.other.namespace',
		pseudo: 'before',
		spacing: true
	},
	'interface': {
		active: true,
		emoji: '💿',
		selector: '.storage.type.interface',
		pseudo: 'after',
		spacing: true
	},
	'include': {
		active: true,
		emoji: '📥',
		selector: '.keyword.control.import.include',
		pseudo: 'after',
		spacing: true
	},
	'goto': {
		active: true,
		emoji: '🚀',
		selector: '.keyword.control.goto',
		pseudo: 'after',
		spacing: true
	}
}
