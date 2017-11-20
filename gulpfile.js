'use strict';
var path = require('path');
var gulp = require('gulp');
var bump = require('gulp-bump');
var handlebars = require('gulp-compile-handlebars');
var mkdir = require('mkdirp');

var pkg = path.join(__dirname, 'package.json');
var version = require(pkg).version;

var PROD = (process.env.NODE_ENV === 'production');
var sourceDirectory = path.join(__dirname, 'src');
var staticDirectory = path.join(__dirname, 'static');
var buildDirectory = path.join(__dirname, PROD ? 'dist' : 'build', 'red5pro-html-testbed-' + version);
var partialsDirectory = path.join(sourceDirectory, 'template', 'partial');

var defaultOptions = {
  batch: [partialsDirectory]
}

var webappBuildDirectory = path.join(__dirname, 'dist-webapp');

mkdir.sync(buildDirectory);

gulp.task('compile', function (cb) {

  gulp.src(path.join(sourceDirectory, 'page', '**', '*.html'))
    .pipe(handlebars({
      version: version
    }, defaultOptions))
    .pipe(gulp.dest(buildDirectory))
    .on('end', cb);

});

gulp.task('move-scripts', ['compile'], function (cb) {

  gulp.src([path.join(sourceDirectory, 'page', '**', '*.js'), path.join(sourceDirectory, 'page', '**', '*.swf')])
    .pipe(gulp.dest(buildDirectory))
    .on('end', cb);

});

gulp.task('move-static', ['compile', 'move-scripts'], function (cb) {

  gulp.src(path.join(staticDirectory, '**'))
    .pipe(gulp.dest(buildDirectory))
    .on('end', cb);

});

gulp.task('build', ['compile', 'move-scripts', 'move-static'], function (cb) {
  cb();
});

gulp.task('build:webapp', function (cb) { // eslint-disable-line no-unused-vars
  buildDirectory = webappBuildDirectory;
  gulp.start('build');
});

gulp.task('bump-version', function() {
  var versionType = process.env.BUMP !== undefined ? process.env.BUMP : 'patch';
  var files = [pkg];
  gulp.src(files)
      .pipe(bump({
        type: versionType
      }))
      .pipe(gulp.dest(__dirname));
});
