const gulp =require('gulp');

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const gulpif=require('gulp-if');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify=require('babelify');


const production = process.env.NODE_ENV === 'production';
const paths={
  index:'src/index.js',
  js:'public/js',
  less:'src/less/*.less',
  css:'public/css'
};

const dependencies=[
  'jquery',
  'react',
  'react-dom',
  'underscore'
];



/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest(paths.js));
});


/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-index', function() {
  return browserify({ entries: 'src/index.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js));
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest(paths.css));
});


gulp.task('watch',function(){
  gulp.watch(paths.less,['styles']);
  gulp.watch(paths.index,['browserify-index']);
});

