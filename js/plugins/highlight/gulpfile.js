const gulp   = require('gulp');
const del    = require('del');
const concat = require('gulp-concat');
const size   = require('gulp-size');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const csso   = require('gulp-csso');

function clean() {
  return del(['dist']);
}

function styles() {
  return gulp.src('./src/androidstudio.css')
    .pipe(concat('androidstudio.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('androidstudio.min.css'))
    .pipe(csso({discardComments: false}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Styles build done successfully!'))
    .pipe(size({showFiles: true}));
}

function scripts() {
  return gulp.src('./src/highlight.js')
    .pipe(concat('highlight.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('highlight.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts build done successfully!'))
    .pipe(size({showFiles: true}));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean   = clean;
exports.styles  = styles;
exports.scripts = scripts;
exports.default = build;