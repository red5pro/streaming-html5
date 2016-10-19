'use strict';
var path = require('path');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var mkdir = require('mkdirp');

var version = require(path.join(__dirname, 'package.json')).version;
var sourceDirectory = path.join(__dirname, 'src');
var staticDirectory = path.join(__dirname, 'static');
var buildDirectory = path.join(__dirname, 'build');
var partialsDirectory = path.join(sourceDirectory, 'template', 'partial');

var defaultOptions = {
  batch: [partialsDirectory]
}

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

  gulp.src(path.join(sourceDirectory, 'page', '**', '*.js'))
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
