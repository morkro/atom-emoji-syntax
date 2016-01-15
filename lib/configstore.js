'use strict';

/**
 * THIS IS AN EXTERNAL DEPENDENCY WHICH I MODIFIED FOR MY
 * OWN NEEDS. REASON: https://github.com/yeoman/configstore/issues/33
 * I WILL FORK AND SEND A PULL REQUEST LATER.
 */

var path = require('path');
var fs = require('graceful-fs');
var osenv = require('osenv');
var assign = require('object-assign');
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var xdgBasedir = require('xdg-basedir');
var osTmpdir = require('os-tmpdir');
var writeFileAtomic = require('write-file-atomic');

var user = (osenv.user() || uuid.v4()).replace(/\\/g, '');
var configDir = xdgBasedir.config || path.join(osTmpdir(), user, '.config');
var permissionError = 'You don\'t have access to this file.';
var defaultPathMode = parseInt('0700', 8);
var writeFileOptions = {mode: parseInt('0600', 8)};

function Configstore(id, defaults, opts) {
	opts = opts || {};

	var pathPrefix = opts.globalConfigPath ?
		path.join(id, 'config.json') :
		path.join('configstore', id + '.json');

	this.path = path.join(configDir, pathPrefix);

	this.all = assign({}, defaults || {}, this.all || {});
}

Configstore.prototype = Object.create(Object.prototype, {
	all: {
		get: function () {
			try {
				return JSON.parse(fs.readFileSync(this.path, 'utf8'));
			} catch (err) {
				// create dir if it doesn't exist
				if (err.code === 'ENOENT') {
					mkdirp.sync(path.dirname(this.path), defaultPathMode);
					return {};
				}

				// improve the message of permission errors
				if (err.code === 'EACCES') {
					err.message = err.message + '\n' + permissionError + '\n';
				}

				// empty the file if it encounters invalid JSON
				if (err.name === 'SyntaxError') {
					writeFileAtomic.sync(this.path, '', writeFileOptions);
					return {};
				}

				throw err;
			}
		},
		set: function (val) {
			try {
				// make sure the folder exists as it
				// could have been deleted in the meantime
				mkdirp.sync(path.dirname(this.path), defaultPathMode);

				writeFileAtomic.sync(this.path, JSON.stringify(val, null, '\t'), writeFileOptions);
			} catch (err) {
				// improve the message of permission errors
				if (err.code === 'EACCES') {
					err.message = err.message + '\n' + permissionError + '\n';
				}

				throw err;
			}
		}
	},
	size: {
		get: function () {
			return Object.keys(this.all || {}).length;
		}
	}
});

Configstore.prototype.get = function (key) {
	key = key.split('.');
	if (key.length === 1) {
		return this.all[key[0]];
	} else {
		return this.all[key[0]][key[1]];
	}
};

Configstore.prototype.set = function (key, val) {
	var config = this.all;
	if (arguments.length === 1 && typeof key === 'object') {
		Object.keys(key).forEach(function (k) {
			config[k] = key[k];
		});
	} else {
		key = key.split('.');
		if (key.length === 1) {
			config[key[0]] = val;
		} else {
			config[key[0]][key[1]] = val;
		}
	}
	this.all = config;
};

Configstore.prototype.del = function (key) {
	var config = this.all;
	delete config[key];
	this.all = config;
};

Configstore.prototype.clear = function () {
	this.all = {};
};

module.exports = Configstore;
