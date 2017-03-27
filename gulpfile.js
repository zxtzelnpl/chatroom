const gulp = require('gulp');

const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const gulpif = require('gulp-if');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const nodemon = require('gulp-nodemon');
const connect = require('gulp-connect');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;


const production = process.env.NODE_ENV === 'production';
const paths = {
  srcJs: ['src/*.js', 'src/**/*.js']
  , index: 'src/index.js'
  , js: 'public/js'
  , less: ['src/less/*.less', 'src/less/**/*.less']
  , normalize: 'node_modules/normalize.css/normalize.css'
  , css: 'public/css'
};

const dependencies = [
  'jquery'
  , 'react'
  , 'react-dom'
  , 'redux'
  , 'react-redux'
  , 'underscore'
  , 'iscroll'
];

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function () {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({mangle: false})))
    .pipe(gulp.dest(paths.js));
});


/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-index', function () {
  return browserify({entries: 'src/index.js', debug: true})
    .external(dependencies)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(production, uglify({mangle: false})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js));
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('less', function () {
  return gulp.src(paths.less[0])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less({
      'strict-math': 'on'
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css));
});

/*
 |--------------------------------------------------------------------------
 | Compile normalize stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('normalize', function () {
  return gulp.src(paths.normalize)
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest(paths.css));
});

/*
 |--------------------------------------------------------------------------
 | Nodemon
 |--------------------------------------------------------------------------
 */
gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js'
    , ext: 'js'
    , ignore: [
      'public/'
      , 'src/'
      , 'node_modules/'
    ]
    , env: {'NODE_ENV': 'development'}
  })
});

/*
 |--------------------------------------------------------------------------
 | Live reload
 |--------------------------------------------------------------------------
 */
gulp.task('server', ['nodemon'], function () {
  const files = [
    'app/views/*.pug'
    , 'app/views/**/*.pug'
    , 'public/*.*'
    , 'public/**/*.*'
  ];
  browserSync.init(files, {
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    notify: false,
    port: 3001
  });

  gulp.watch(files).on("change", reload)

});


/*
 |--------------------------------------------------------------------------
 | Watch for change.
 |--------------------------------------------------------------------------
 */
gulp.task('watch', ['browserify-index', 'less'], function () {

  gulp.watch(paths.srcJs, ['browserify-index']).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  });

  gulp.watch(paths.less, ['less']).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  });

});

/*
 |--------------------------------------------------------------------------
 | Default.
 |--------------------------------------------------------------------------
 */
gulp.task('default', [
  'browserify-vendor'
  , 'normalize'
  , 'watch'
  , 'server'
]);

/*
 |--------------------------------------------------------------------------
 | Produce.
 |--------------------------------------------------------------------------
 */
gulp.task('produce', [
  'browserify-vendor'
  , 'browserify-index'
  , 'normalize'
  , 'less'
  , 'nodemon'
]);
