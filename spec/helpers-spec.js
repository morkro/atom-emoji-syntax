'use babel';

import HTML from '../lib/helpers/create-html';
import createNode from '../lib/helpers/create-node';
import createSelector from '../lib/helpers/create-selector';
import { getLanguage, getAllLanguages } from '../lib/helpers/get-all-languages';
import getArrayOfProp from '../lib/helpers/get-array-of-props';
import getListOfEmoji from '../lib/helpers/get-list-of-emoji';
import { isEmoji, getHexadecimalUnicode } from '../lib/helpers/unicode';

describe('Creates HTML', () => {
	const element = createNode('div');
	const content = 'foo content';

	beforeEach(() => {
		element.innerHTML = HTML`
			<div id="html-foo">
				<span>${content}</span>
			</div>
		`;
	});

	it('is correctly created and contains content', () => {
		expect(element.querySelector('#html-foo')).toBeDefined();
		expect(element.querySelector('#html-foo span').textContent).toContain('foo content');
	});
});

describe('Creating a node', () => {
	let firstElement = null;
	let scndElement = null;

	beforeEach(() => {
		firstElement = createNode('div', {
			textContent: 'foo',
			id: 'emoji-foo',
			className: 'emoji-class',
			attributes: {
				'data-emoji': 'foo'
			}
		});
		scndElement = createNode('span', {
			className: ['emoji', 'foo', 'class'],
			append: createNode('strong', { textContent: 'baz' })
		});
	});

	it('has text content, an ID, one class and a data-attribute', () => {
		expect(firstElement.textContent).toContain('foo');
		expect(firstElement.id).toContain('emoji-foo');
		expect(firstElement.classList.contains('emoji-class')).toBe(true);
		expect(firstElement.hasAttribute('data-emoji')).toBe(true);
		expect(firstElement.getAttribute('data-emoji')).toContain('foo');
	});

	it('has an element appended and multiple classes', () => {
		expect(scndElement.classList.length).toBe(3);
		expect(scndElement.classList.contains('emoji')).toBe(true);
		expect(scndElement.classList.contains('foo')).toBe(true);
		expect(scndElement.classList.contains('class')).toBe(true);
		expect(scndElement.querySelector('strong')).toBeDefined();
		expect(scndElement.querySelector('strong').textContent).toContain('baz');
	});
});

describe('Creating a CSS selector', () => {
	let selector = null;
	let css = null;

	beforeEach(() => {
		css = getLanguage('css').all;
		selector = createSelector(css.languageSelector, {
			emoji: css['@import'].emoji,
			selector: css['@import'].selector,
			pseudo: css['@import'].pseudo,
			spacing: css['@import'].spacing
		});
	});

	it('is a valid CSS selector', () => {
		expect(typeof selector === 'string').toBe(true);
	});
});

describe('Receiving language objects', () => {
	const allLanguages = getAllLanguages(true);
	const specificLanguage = getLanguage('javascript');

	it('returned all available language objects', () => {
		expect(allLanguages.length).toBeGreaterThan(0);
		expect(allLanguages instanceof Array).toBe(true);
	});

	it('returns the correct language', () => {
		expect(specificLanguage.all.languageName).toContain('JavaScript');
	});
});

describe('Returns an array of properties from object', () => {
	const object = {
		lorem: { foo: 'bar', different: true, more: 'yay' },
		ipsum: { foo: 'bar', different: false, more: 'yay' },
		dolor: { foo: 'baz', different: true, more: 'yay' },
		sit: { foo: 'bar', different: true, more: 'yay' },
		amet: { foo: 'baz', different: false, more: 'yay' },
		something: { foo: 'hello', different: true, more: 'yay' }
	};
	const foos = getArrayOfProp('foo', object);
	const diffs = getArrayOfProp('different', object);

	it('should be an array', () => {
		expect(foos.length).toEqual(3);
		expect(foos instanceof Array).toBe(true);
		expect(diffs.length).toEqual(2);
		expect(diffs instanceof Array).toBe(true);
	});

	it('should contain', () => {
		expect(foos).toContain('bar');
		expect(foos).not.toContain('more');
		expect(diffs).not.toContain('foo');
	});
});

describe('Returns a sorted list of all emoji', () => {
	const list = getListOfEmoji();

	it('should have the correct types', () => {
		expect(typeof list === 'object').toBe(true);
		expect(list[Object.keys(list)[0]] instanceof Array).toBe(true);
	});
});

describe('Is valid emoji', () => {
	const emojiContent = '🔥';
	const normalContent = 'string';

	it('correctly identifies a string as emoji', () => {
		expect(isEmoji(emojiContent)).toBe(true);
		expect(isEmoji(normalContent)).toBe(false);
	});
});

describe('Hexadecimal unicode from emoji', () => {
	const unicode = getHexadecimalUnicode('💩');

	it('is a string', () => {
		expect(typeof unicode === 'string').toBe(true);
	});

	it('returns the correct hexadecimal unicode', () => {
		expect(unicode).toMatch('1f4a9');
	});
});
