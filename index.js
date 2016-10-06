var path = require('path');
var fs = require('fs-extra');
var through = require('through2');
var _ = require('lodash');
var async = require('async');

module.exports = function(options) {
	options = _.extend({
		path: './',
		rename: {}
	}, options);

	var initialized = false;

	options.rename = _.map(options.rename, function (targetPath, path) {
		return {
			path: path,
			targetPath: targetPath
		};
	});

	function renameFiles(cb) {
		async.each(options.rename, function (item, cb2) {
			fs.move(path.join(options.path, item.path), path.join(options.path, item.targetPath), function (err) {
				cb2();
			});
		}, cb);
	}

	function process(contents) {
		_.each(options.rename, function (item) {
			contents = contents.replace(item.path, item.targetPath);
		});

		return contents;
	};

	return through.obj(function (file, enc, cb) {
		var run = function (err) {
			initialized = true;

			var contents = process(file.contents.toString());
			file.contents = new Buffer(contents);

			this.push(file);
			cb();
		}.bind(this);

		if (initialized) {
			run();
		} else {
			renameFiles(run);
		}

	});
};
