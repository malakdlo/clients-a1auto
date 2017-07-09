var gulp = require('gulp'), 
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    gconcat = require('gulp-concat'),
    gminify = require('gulp-minify'),
    browserify = require('gulp-browserify');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/mainScripts.js', 'components/scripts/modernizr-custom.js', 'components/scripts/bootstrap.js', 'components/scripts/mobile.js'];


gulp.task('log', function(){ 
  gutil.log('Gulp has started'); 
});

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(gconcat('scripts.js'))
    .pipe(gulp.dest('builds/dev/js'))
});
//     .pipe(browserify())
//    .pipe(gminify())