<img src="https://rawgit.com/morkro/atom-emoji-syntax/master/resources/emoji-syntax-logo.svg" alt="Emoji Syntax" style="width:100%;">
<a href="https://travis-ci.org/morkro/atom-emoji-syntax"><img src="https://travis-ci.org/morkro/atom-emoji-syntax.svg?branch=master" alt="Build Status"></a> <img alt="devDependencies" src="https://david-dm.org/morkro/atom-emoji-syntax.svg">
---

Getting bored of your code? Already tried out hundreds of syntax highlighter but always felt something is missing?

**Emoji Syntax is what you need!**

An atom package adding emoji to language keywords.

## Installation
Install Emoji Syntax either via `apm`
```
apm install emoji-syntax
```
or search for `emoji syntax` in your Atom settings panel.

## Features :fire:
- **Emoji-Syntax is on top of your syntax theme**; you can still choose any theme you like
- Choose between four different emoji styles
- Change existing keywords with *any* emoji you want
- Define position and spacing of an emoji around the keyword
- Disable entire languages or only specific keywords

## Supported languages :microphone:
Only official language packages are supported by Emoji Syntax. Other language packages might use different selectors to highlight syntax and might not work as intended.

_Note: some screenshots show only a fraction of available emoji per language._

JavaScript `.js` | CSS `.css`
---------- | --- | ----
<img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/javascript-preview.png'> | <img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/css-preview.png'>
**Sass `.scss, .sass`** | **PHP `.php`**
<img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/scss-preview.png'> | <img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/php-preview.png'>
**Python `.py`** | **TypeScript `.ts`**

_This package does not actually add emoji characters to your code—don't worry—your linter or tests won't go crazy!_

## Icon Sets
_Note: not all emoji are supported in each of the custom sets yet!_
<table>
	<tr>
		<th>Native</th>
		<th>Twemoji</th>
	</tr>
	<tr>
		<td><img src="https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/style-native.png" alt="Native"></td>
		<td><img src="https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/style-twemoji.png" alt="Twemoji"></td>
	</tr>
	<tr>
		<th>Noto Emoji</th>
		<th>EmojiOne™</th>
	</tr>
	<tr>
		<td><img src="https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/style-noto-emoji.png" alt="Noto Emoji"></td>
		<td><img src="https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/style-emojione.png" alt="EmojiOne™"></td>
	</tr>
</table>

## Package Settings :wrench:

| Name                                                           | Default |                 Options                |
|:---------------------------------------------------------------|:-------:|:--------------------------------------:|
| **Emoji Style**: Lets you choose between different emoji icon sets | `Native`  | `Native, Twemoji, Noto Emoji, Emoji One` |

## Emoji Settings Page :wrench:
Emoji Syntax comes with its own settings page. There you can customise, activate and deactivate every emoji for each language. The settings page is available through `Packages > Emoji Syntax > Settings` or the `emoji-syntax:settings` command.

![Emoji Settings Page](https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/settingspage-preview.png)

Each language has its own section which you can deactivate. Doing that, the entire language won't have any emoji. The following options are available:

- `Emoji`: opens a modal of emoji to choose from
- `Position`: the position of the emoji around the keyword (e.g. `📦 import` or `import 📦 `)
- `Spacing`: adds spacing between emoji and keyword (e.g. `function 🔧 () {}` or `function🔧 () {}`)

## Contribution :family:

If you want to contribute by either extending/improving a language set, adding a new language, fixing a bug or anything else you can do that by simply sending a pull request.

[API documentation](https://doclets.io/morkro/atom-emoji-syntax/master) via Doclets.

## License :copyright:
The code is available under [MIT License](https://github.com/morkro/atom-emoji-syntax/blob/master/LICENSE).

#### Emoji graphics
- [Twemoji](https://github.com/twitter/twemoji) licensed under [CC-BY 4.0](https://github.com/twitter/twemoji/blob/gh-pages/LICENSE-GRAPHICS)
- [Noto Emoji](https://github.com/googlei18n/noto-emoji) licensed under [SIL Open Font License, version 1.1](https://github.com/googlei18n/noto-emoji/blob/master/fonts/LICENSE)
- [EmojiOne™](https://github.com/Ranks/emojione) licensed under [Creative Commons Attribution 4.0 International](https://github.com/Ranks/emojione/blob/master/LICENSE.md)
