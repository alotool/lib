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
  return gulp.src('./src/w3pro.css')
    .pipe(concat('w3pro.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('w3pro.min.css'))
    .pipe(csso({discardComments: false}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Styles build done successfully!'))
    .pipe(size({showFiles: true}));
}

function scripts() {
  return gulp.src('./src/w3pro.js')
    .pipe(concat('w3pro.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('w3pro.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts build done successfully!'))
    .pipe(size({showFiles: true}));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.default = build;