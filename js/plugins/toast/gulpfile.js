const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const size = require('gulp-size');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

const catchError = function(err) {
  console.log(err.toString());
  this.emit('end')
};

function clean() {
  return del(['dist']);
}

function styles() {
  return gulp.src('./src/css/style.styl')
    .pipe(stylus())
    .on('error', catchError)
    .pipe(concat('toast.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('toast.min.css'))
    .pipe(csso({
      discardComments: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Stylus build done successfully!'))
    .pipe(size({
      showFiles: true
    }));
}

function scripts() {
  return gulp.src('./src/js/toast.js')
    .pipe(concat('toast.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('toast.min.js'))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Scripts build done successfully!'))
    .pipe(size({
      showFiles: true
    }));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.default = build;