module.exports = {
	active: true,
	languageName: 'TypeScript',
	languageSelector: '.source.ts',
	'function': {
		active: true,
		emoji: '🔧',
		selector: '.function.type:not(.parameter):not(.return)',
		pseudo: 'after',
		spacing: false
	},
	'method': {
		active: true,
		emoji: '🔧',
		selector: '.meta.method .entity.name',
		pseudo: 'before',
		spacing: true
	},
	'objects': {
		active: true,
		emoji: '📀',
		selector: '.meta.declaration.object > .storage.type:first-child',
		pseudo: 'before',
		spacing: true
	},
	'variables': {
		active: true,
		emoji: '💎',
		selector: '.meta.expr.var > .storage.type',
		pseudo: 'after',
		spacing: true
	}
}
