module.exports = {
	active: true,
	languageName: 'JavaScript',
	languageSelector: '.source.js',
	'import': {
		active: true,
		emoji: '📦',
		selector: '.meta.import .keyword:first-child',
		pseudo: 'before',
		spacing: true
	},
	'export': {
		active: true,
		emoji: '📦',
		selector: '.meta.export .keyword:first-child',
		pseudo: 'before',
		spacing: true
	},
	'delete': {
		active: true,
		emoji: '💣',
		selector: '.keyword.operator.delete',
		pseudo: 'before',
		spacing: true
	},
	'function': {
		active: true,
		emoji: '🔧',
		selector: '.function.type:not(.arrow)',
		pseudo: 'after',
		spacing: false
	},
	'arrow': {
		active: true,
		emoji: '🔧',
		selector: '.function.arrow.type',
		pseudo: 'before',
		spacing: true
	},
	'typeof': {
		active: true,
		emoji: '🔬',
		selector: '.keyword.operator.typeof',
		pseudo: 'before',
		spacing: true
	},
	'instanceof': {
		active: true,
		emoji: '🔬',
		selector: '.keyword.operator.instanceof',
		pseudo: 'before',
		spacing: true
	},
	'yield': {
		active: true,
		emoji: '📣',
		selector: '.control.yield .keyword',
		pseudo: 'before',
		spacing: true
	},
	'console': {
		active: true,
		emoji: '🚧',
		selector: '.console.entity.name',
		pseudo: 'before',
		spacing: true
	},
	'method': {
		active: true,
		emoji: '🔮',
		selector: '.meta.method .entity.name',
		pseudo: 'before',
		spacing: true
	},
	'const': {
		active: true,
		emoji: '💎',
		selector: '.storage.modifier',
		pseudo: 'after',
		spacing: true
	},
	'var': {
		active: true,
		emoji: '🌀',
		selector: '.storage.type.var',
		pseudo: 'after',
		spacing: true
	}
}
