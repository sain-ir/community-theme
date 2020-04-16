/**
 * © 2017 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: MIT
 */

'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var log = require('fancy-log');
const debug = require('gulp-debug');
var gulpmatch = require('gulp-match');
var map = require('map-stream');


var liferayThemeTasks = require('liferay-theme-tasks');
const lfrThemeConfig = require('liferay-theme-tasks/lib/liferay_theme_config');
const themeUtil = require('liferay-theme-tasks/lib/util');
const path = require('path');
const _ = require('lodash');
const {createBourbonFile} = require('liferay-theme-tasks/lib/bourbon_dependencies');

liferayThemeTasks.registerTasks({
	gulp,
});

liferayThemeTasks.registerTasks({
	gulp: gulp,
	hookFn: function(gulp,options) {
		const {pathBuild} = options;
		gulp.task('build:r2', function(done) {
			const r2 = require('gulp-liferay-r2-css');
			const plugins = require('gulp-load-plugins')();
			const fs = require('fs');

			return gulp
				.src([pathBuild + '/css/*.css','!'+pathBuild+'/css/*_rtl.css'])
				.pipe(plugins.rename({
					suffix: '_rtl',
				}))
				.pipe(r2())
				.pipe(map(function (file, cb) {
					fs.stat(file.path, function(err, data) {
						if (!err) {
							var content = fs.readFileSync(file.path, 'utf8');
							file.contents = Buffer.from(file.contents.toString('utf8').concat(content));
						}
					});
					cb(null, file);
				}))
				.pipe(gulp.dest(pathBuild + '/css'));
		});

	}
});

