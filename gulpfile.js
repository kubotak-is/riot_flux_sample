/**************************************************
 * modules load
 *************************************************/
var gulp               = require('gulp');
var $                  = require('gulp-load-plugins')();
var npm                = require('rollup-plugin-npm');
var json               = require('rollup-plugin-json');
var commonjs           = require('rollup-plugin-commonjs');
var rollupIncludePaths = require('rollup-plugin-includepaths');
var del                = require('del');
var run                = require('run-sequence');

/**
 * env option `gulp --env production`
 */
var env = $.environments.production();

var includePathOptions = {  
    paths: ['resourses/assets/javascript'],
    extensions: ['', '.js', '.tag'],
};

var paths = {
    src: 'resourses/assets/javascript/controllers/**/*.js',
    dest: 'public/js',
    riot: 'resourses/assets/javascript/tags/**/*.tag',
    riotDest: 'resourses/assets/javascript/components'
};
 
var watchPaths = {
    js: 'resourses/assets/javascript/**/*'
};

/**************************************************
 * tasks compile:riot
 *************************************************/
gulp.task('compile:riot', function() {
  return gulp.src(paths.riot)
    .pipe($.riot())
    .pipe(gulp.dest(paths.riotDest));
});

/**************************************************
 * tasks compile:js
 *************************************************/
gulp.task('compile:js', function() {
  return gulp.src(paths.src)
        .pipe(
            $.rollup({
              format: 'es6',
              sourceMap: !env,
              plugins: [
                rollupIncludePaths(includePathOptions),
                npm({
                  jsnext:  true,
                  main:    true,
                  browser: true
                }),
                commonjs(),
                json()
              ]
            })
        )
        .pipe($.buble())
        .pipe($.if(env, $.uglify({
          mangle: true,
          preserveComments: 'license'
        })))
        .pipe($.if(!env, $.sourcemaps.write("./maps")))
        .pipe(gulp.dest(paths.dest));
});

/**************************************************
 * tasks clean:build
 *************************************************/
gulp.task('clean:build', function() {
    del([
      'resourses/assets/javascript/components/*',
      'public/build/*',
      paths.dest
    ]);
});

/**************************************************
 * tasks watch:js
 *************************************************/
gulp.task('watch:js', function() {
  gulp.watch(watchPaths.js, ['compile:riot', 'compile:js']);
});

/**************************************************
 * tasks build
 *************************************************/
gulp.task('build', function(cb) {
  run('clean:build', 'compile:riot', 'compile:js', cb);
});

gulp.task('default', ['build']);