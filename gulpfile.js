const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const bs = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssnano]))
  .pipe(dest('dist', { sourcemaps: '.'}));
}

// Javascript Task
function jsTask() {
  return src('app/js/script.js', { sourcemaps: true})
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Task
function browsersyncServe(cb) {
  bs.init({
    server: '.'
  });
  cb();
}

function browsersyncReload(cb) {
  bs.reload()
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browsersyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);
exports.build = scssTask, jsTask;
