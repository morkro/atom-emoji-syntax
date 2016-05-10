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

JavaScript `.js` | CSS `.css`
---------- | --- | ----
<img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/javascript-preview.png'> | <img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/css-preview.png'>
**Sass `.scss, .sass`** | **PHP `.php`**
<img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/scss-preview.png'> | <img src='https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/php-preview.png'>
**Python `.py`** | **TypeScript `.ts`**

### Planned
Take a look into the [issues page](https://github.com/morkro/atom-emoji-syntax/labels/feature).

## Package Settings :wrench:

_Since version `1.0.0` of Emoji Syntax the `strictEmojiMode` option has been removed._

## Emoji Settings Page :wrench:
Emoji Syntax comes with its own settings page. There you can customise, activate and deactivate every emoji for each language. The settings page is available through `Packages > Emoji Syntax > Settings` or the `emoji-syntax:settings` command.

![Emoji Settings Page](https://cdn.rawgit.com/morkro/atom-emoji-syntax/master/resources/settingspage-preview.png)

Each language has its own section which you can deactivate. Doing that, the entire language won't have any emoji. The following options are available:

- `Emoji`: opens a modal of emoji to choose from
- `Position`: the position of the emoji around the keyword (e.g. `📦 import` or `import 📦 `)
- `Spacing`: adds spacing between emoji and keyword (e.g. `function 🔧 () {}` or `function🔧 () {}`)

## Contribution :family:

If you want to contribute by either extending/improving a language set, adding a new language, fixing a bug or anything else you can do that by simply sending a pull request.

## License :copyright:
The code is available under [MIT License](https://github.com/morkro/atom-emoji-syntax/blob/master/LICENSE).
