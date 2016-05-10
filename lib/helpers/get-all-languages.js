'use babel';

// System
import ConfigStore from 'configstore';
// Defaults
import javascript from '../languages/javascript';
import php from '../languages/php';
import css from '../languages/css';
import scss from '../languages/scss';
import python from '../languages/python';
import typescript from '../languages/typescript';

const javascriptConfig = new ConfigStore(javascript.languageName, javascript);
const phpConfig = new ConfigStore(php.languageName, php);
const cssConfig = new ConfigStore(css.languageName, css);
const scssConfig = new ConfigStore(scss.languageName, scss);
const pythonConfig = new ConfigStore(python.languageName, python);
const typescriptConfig = new ConfigStore(typescript.languageName, typescript);
const languages = {
	javascript: javascriptConfig,
	php: phpConfig,
	css: cssConfig,
	scss: scssConfig,
	python: pythonConfig,
	typescript: typescriptConfig
};

/**
 * Takes the package config and returns all enabled languages as array.
 * @return {Array}  [List of all enabled languages]
 */
export function getAllLanguages (filter) {
	if (!filter) {
		const list = [];

		if (javascriptConfig.all.active) list.push(javascriptConfig.all);
		if (phpConfig.all.active) list.push(phpConfig.all);
		if (cssConfig.all.active) list.push(cssConfig.all);
		if (scssConfig.all.active) list.push(scssConfig.all);
		if (pythonConfig.all.active) list.push(pythonConfig.all);
		if (typescriptConfig.all.active) list.push(typescriptConfig.all);

		return list;
	}

	return [
		javascriptConfig.all,
		phpConfig.all,
		cssConfig.all,
		scssConfig.all,
		pythonConfig.all,
		typescriptConfig.all
	];
}

/**
 * Returns the respective language object
 * @param  {String} name [The language name]
 * @return {Object}      [The config object]
 */
export function getLanguage (name) {
	return languages[name];
}
