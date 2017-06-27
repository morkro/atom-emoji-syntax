## 1.7.2 (27th June, 2017)
* Fixed the settings pane which didn't open anymore _(Issue [#48](https://github.com/morkro/atom-emoji-syntax/issues/48))_

## 1.7.1 (3rd April, 2017)
* Fixed unwanted emoji added to `switch` keyword in JavaScript files

## 1.7.0 (3rd April, 2017)
* Added support for `language-babel` package _(Issue [#45](https://github.com/morkro/atom-emoji-syntax/issues/45))_
* Added support for `.jsx` and `.tsx` files _(Issue [#43](https://github.com/morkro/atom-emoji-syntax/issues/43))_
* Updated Standard.js version to `9.0.2`

## 1.6.5 (2nd March, 2017)
* Fixed an issue with broken line heights _(Issue [#44](https://github.com/morkro/atom-emoji-syntax/issues/44))_

## 1.6.4 (9th February, 2017)
* [Accidentally] Fixed a GitHub authentication issue

## 1.6.3 (9th February, 2017)
* Updated JavaScript `const` selector in response to Atom update _(PR [#41](https://github.com/morkro/atom-emoji-syntax/pull/41))_

## 1.6.2 (January 24th, 2017)
* Fixed issue where the settings page added more and more content after reopening _(Issue [#38](https://github.com/morkro/atom-emoji-syntax/issues/38))_

## 1.6.1 (January 16th, 2017)
* Fixed issue with `const` keyword in JavaScript

## 1.6.0 (January 15th, 2017)
* Added more language keywords
	* JavaScript: `class`, `default`
	* CSS: `@namespace`, `@charset`
	* Sass: `@each`, `@while`
	* Python: `def`, `class`, `nonlocal`
	* TypeScript: `class`, `export`, `import`, `typeof`, `instanceof`, `console`

## 1.5.3 (January 13th, 2017)
_A GitHub/Atom.io Server outage caused some trouble while I was just publishing the package. This fixed it._

## 1.5.2 (January 13th, 2017)
* Fixed another issue, related to the previous Atom version update
* Updated README

## 1.5.1 (January 12th, 2017)
* Fixed issue introduced by new Atom version

## 1.5.0 (December 5th, 2016)
* Introducing new settings page layout
* Added option to set a language back to default _(Issue [#5](https://github.com/morkro/atom-emoji-syntax/issues/5))_
* Fixed weird line height occuring in custom emoji styles _(Issue [#34](https://github.com/morkro/atom-emoji-syntax/issues/34))_
* Fixed an issue with error messages popping up in the Developer Tools _(Issue [#35](https://github.com/morkro/atom-emoji-syntax/issues/35))_
* Some more architectural package updates
* Added more tests

## 1.4.0 (November 16th, 2016)
* Updated some of the internal logic for package and user settings management.
* Cleaned up architecture

## 1.3.0 (August 8th, 2016)
* Added support for `arrow` keyword in JavaScript and updated language selectors after Atom update
* Added way to overwrite a language defaults `selector`
* Fixed minor issues introduced during development

## 1.2.2 (May 21st, 2016)
* Fixed failed tests

## 1.2.1 (May 21st, 2016)
* Fixed broken link to SVG images

## 1.2.0 (May 21st, 2016)
* Added support for different emoji style sets _(Issue [#14](https://github.com/morkro/atom-emoji-syntax/issues/14))_
* Refactored large parts of the code including custom elements, controllers and helper functions
* Updated testing

## 1.1.0 (May 10th, 2016)
* Added language support for TypeScript _(Issue [#20](https://github.com/morkro/atom-emoji-syntax/issues/20))_

## 1.0.1 (April 20st, 2016)
* Changed LICENSE extension (formerly `.md`) because Atom couldn't find it

## 1.0.0 (April 17st, 2016)
* Changed emoji option in settings to a list of all existing emoji. This removed the `strictEmojiMode` option from the package settings and is reason for the major version bump. _(Issue [#9](https://github.com/morkro/atom-emoji-syntax/issues/9))_
* Layout update of the settings page
* Removed unneeded dependencies
* Added ESLint
* Updated README

## 0.5.2 (March 31st, 2016)
* Added one more emoji keyword to SCSS

## 0.5.1 (March 24th, 2016)
* Replaced work-around helper function with NPM module

## 0.5.0 (March 12th, 2016)
* Added a couple of more emoji keywords in JavaScript _(PR [#10](https://github.com/morkro/atom-emoji-syntax/pull/10))_

## 0.4.0 (January 17th, 2016)
* Added some more tests
* Minor [improvements](https://github.com/morkro/atom-emoji-syntax/commit/de31950fd16db20f7157c2577a1994b680967778)

## 0.3.0 (January 16th, 2016)
* Improved PHP keyword support _(Issue [#2](https://github.com/morkro/atom-emoji-syntax/issues/2))_
* Added basic support for Python

## 0.2.0 (January 15th, 2016)
* Improved testing for `<emoji-keyword>` element

## 0.1.0 - First Release (January 15th, 2016)
* Every feature added
