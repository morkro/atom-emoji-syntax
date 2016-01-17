'use babel';

import createNode from '../lib/helpers/create-node';
import HTML from '../lib/helpers/create-html';
import isEmoji from '../lib/helpers/is-emoji';
import { getLanguage, getAllLanguages } from '../lib/helpers/get-all-languages';
import getLanguageSelectors from '../lib/helpers/get-language-selectors';
import createSelector from '../lib/helpers/create-selector';
import createStyleSheet from '../lib/helpers/create-stylesheet-element';

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

describe('Creates HTML', () => {
   let element = createNode('div');
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

describe('Is valid emoji', () => {
   const emojiContent = '🔥';
   const normalContent = 'string';

   it('correctly identifies a string as emoji', () => {
      expect(isEmoji(emojiContent)).toBe(true);
      expect(isEmoji(normalContent)).toBe(false);
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

   it('is a valid CSS selector', () => {
      expect(typeof selector === 'string').toBe(true);
      expect(selector).toContain('.source.css .keyword.at-rule.import::before { content: "📦 "; }');
   });
});

describe('Create a valid <style> element', () => {
   let elementDefault = null;
   let elementCustom = null;

   beforeEach(() => {
      elementDefault = createStyleSheet( getLanguageSelectors() );
      elementCustom = createStyleSheet( getLanguageSelectors(), {
         selector: '.emoji-class',
         context: 'different-context',
         priority: 'highest'
      });
      console.log(elementCustom, elementDefault);
   });

   it('is a valid HTML element', () => {
      expect(elementDefault instanceof HTMLElement).toBe(true);
      expect(elementDefault.nodeName).toContain('STYLE');
      expect(elementCustom instanceof HTMLElement).toBe(true);
      expect(elementCustom.nodeName).toContain('STYLE');
   });

   it('has content', () => {
      expect(typeof elementDefault.textContent === 'string').toBe(true);
      expect(typeof elementCustom.textContent === 'string').toBe(true);
   });

   describe('Default configuration', () => {
      it('has all default attributes', () => {
            expect(elementDefault.classList.contains('emoji-syntax-stylesheet')).toBe(true);
            expect(elementDefault.hasAttribute('context')).toBe(true);
            expect(elementDefault.getAttribute('context')).toContain('atom-text-editor');
            expect(elementDefault.hasAttribute('priority')).toBe(true);
            expect(elementDefault.getAttribute('priority')).toContain('2');
      });
   });

   describe('Custom configuration', () => {
      it('has all custom attributes', () => {
            expect(elementCustom.classList.contains('emoji-class')).toBe(true);
            expect(elementCustom.hasAttribute('context')).toBe(true);
            expect(elementCustom.getAttribute('context')).toContain('different-context');
            expect(elementCustom.hasAttribute('priority')).toBe(true);
            expect(elementCustom.getAttribute('priority')).toContain('highest');
      });
   });
});