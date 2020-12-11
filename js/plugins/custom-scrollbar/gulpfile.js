const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const size = require('gulp-size');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

function clean() {
  return del(['dist']);
}

function styles() {
  return gulp.src('./src/css/jquery.mCustomScrollbar.css')
    .pipe(concat('custom-scrollbar.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('custom-scrollbar.min.css'))
    .pipe(csso({discardComments: false}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Styles build done successfully!'))
    .pipe(size({showFiles: true}));
}

function scripts() {
  return gulp.src('./src/js/jquery.mCustomScrollbar.js')
    .pipe(concat('custom-scrollbar.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('custom-scrollbar.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts build done successfully!'))
    .pipe(size({showFiles: true}));
}

function scriptsCopy() {
  return gulp.src('./src/js/jquery.mCustomScrollbar.concat.min.js')
    .pipe(concat('custom-scrollbar.concat.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts copy done successfully!'))
    .pipe(size({showFiles: true}));
}

function resourceCopy() {
  return gulp.src('./src/css/mCSB_buttons.png')
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Resource copy done successfully!'))
    .pipe(size({showFiles: true}));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, scriptsCopy, resourceCopy));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.scriptsCopy = scriptsCopy;
exports.resourceCopy = resourceCopy;
exports.default = build;