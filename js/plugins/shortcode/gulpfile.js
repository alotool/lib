const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const size = require('gulp-size');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');

function clean() {
  return del(['dist']);
}

function scripts() {
  return gulp.src('./src/shortcode.js')
    .pipe(concat('shortcode.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('shortcode.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts build done successfully!'))
    .pipe(size({showFiles: true}));
}

const build = gulp.series(clean, gulp.parallel(scripts));

exports.clean = clean;
exports.scripts = scripts;
exports.default = build;