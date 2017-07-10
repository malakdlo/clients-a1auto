var gulp = require('gulp'), 
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    gconcat = require('gulp-concat'),
    gminify = require('gulp-minify'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    sass = require('gulp-ruby-sass'),
    cssScss = require('gulp-css-scss'),
    connect = require('gulp-connect');

/*************************
      FILE SOURCES
*************************/
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/mainScripts.js', 'components/scripts/modernizr-custom.js', 'components/scripts/bootstrap.js', 'components/scripts/mobile.js', 'components/scripts/css/swiper/swiper.jquery.js'];
var cssSources = ['builds/dev/css/plugins/swiper/css/swiper.css']

/*************************
      SEPARATE TASKS
*************************/

/**** Core ****/

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(gconcat('scripts.js'))
    .pipe(gulp.dest('builds/dev/js'))
    .pipe(connect.reload())
});

gulp.task('fontAwesome', function(){
  sass('components/sass/font-awesome/font-awesome.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('builds/dev/fonts'))
    .pipe(connect.reload())
});

gulp.task('style', function(){
  sass('components/sass/style/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('builds/dev/css'))
    .pipe(connect.reload())
});

/**** Optional ****/

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
    .pipe(connect.reload())
});

gulp.task('log', function(){ 
  gutil.log('Gulp has started'); 
});

gulp.task('css-scss', function(){
  gulp.src(cssSources)
    .pipe(cssScss())
    .pipe(gulp.dest('components/sass/style'))
});


/*************************
      AUTOMATED TASKS
*************************/

gulp.task('watch', function(){
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/style/*.scss', ['style']);
});

gulp.task('default', ['js', 'style', 'fontAwesome']);



//     .pipe(browserify())
//    .pipe(gminify())