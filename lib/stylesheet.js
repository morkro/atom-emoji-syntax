'use babel';

import getLanguageSelectors from './helpers/get-language-selectors';
import createStyleSheet from './helpers/create-stylesheet-element';

const selector = 'emoji-syntax-stylesheet';
let styleSheet = createStyleSheet(getLanguageSelectors(), { selector });

/**
* Checks if the stylesheet is available in <atom-styles>
* @return {Boolean}
*/
export function hasStyleSheet () {
	return !!atom.stylesElement.querySelector(`.${selector}`);
}

/**
* Removes the stylesheet element from <atom-styles>
* @return {undefined}
*/
export function removeStyleSheet () {
	atom.styles.removeStyleElement(styleSheet);
}

/**
* Adds the stylesheet element to <atom-styles>
* @return {Boolean} True if successful, false if not
*/
export function addStyleSheet () {
	if (!hasStyleSheet()) {
		atom.styles.addStyleElement(styleSheet);
		return true;
	}
	return false;
}

/**
* Removes, creates a new stylesheet and adds it again.
* @return {undefined}
*/
export function updateStyleSheet () {
	removeStyleSheet();
	styleSheet = createStyleSheet(getLanguageSelectors(), { selector });
	addStyleSheet();
}

/**
* Returns the stylesheet element
* @return {Object} styleSheet - The <style> element
*/
export function getStyleSheet () {
	return styleSheet;
}
