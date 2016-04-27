'use babel';

// System
import ConfigStore from 'configstore';
// Defaults
import javascript from '../languages/javascript';
import php from '../languages/php';
import css from '../languages/css';
import scss from '../languages/scss';
import python from '../languages/python';

const jsConf = new ConfigStore(javascript.languageName, javascript);
const phpConf = new ConfigStore(php.languageName, php);
const cssConf = new ConfigStore(css.languageName, css);
const scssConf = new ConfigStore(scss.languageName, scss);
const pythonConf = new ConfigStore(python.languageName, python);
const languages = {
	javascript: jsConf,
	php: phpConf,
	css: cssConf,
	scss: scssConf,
	python: pythonConf
};

/**
 * Takes the package config and returns all enabled languages as array.
 *
 * @param {Boolean} filter
 * @return {Array} List of all enabled languages
 */
export function getAllLanguages (filter) {
	if (!filter) {
		const list = [];

		if (jsConf.all.active) list.push(jsConf.all);
		if (phpConf.all.active) list.push(phpConf.all);
		if (cssConf.all.active) list.push(cssConf.all);
		if (scssConf.all.active) list.push(scssConf.all);
		if (pythonConf.all.active) list.push(pythonConf.all);

		return list;
	}

	return [jsConf.all, phpConf.all, cssConf.all, scssConf.all, pythonConf.all];
}

/**
 * Returns the respective language object
 *
 * @param {String} name - The language name
 * @return {Object} The config object
 */
export function getLanguage (name) {
	return languages[name];
}
