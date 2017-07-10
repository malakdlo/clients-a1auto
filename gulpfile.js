var os = require('os'),
    gulp = require('gulp'), 
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    gconcat = require('gulp-concat'),
    gminify = require('gulp-minify'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    sass = require('gulp-ruby-sass'),
    cssScss = require('gulp-css-scss'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');
var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;


/*************************
        SETUP
*************************/

/**** Env ****/
env = process.env.NODE_ENV || 'dev';
if(env==='dev'){
  outputDir = 'builds/dev/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/prod/';
  sassStyle = 'compressed';
}

/**** Set Browser for Open Task ****/
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

/**** Files ****/
// Components
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/mainScripts.js', 'components/scripts/modernizr-custom.js', 'components/scripts/bootstrap.js', 'components/scripts/mobile.js', 'components/scripts/css/swiper/swiper.jquery.js'];
var fontAwesomeSources = ['components/sass/font-awesome/font-awesome.scss'];
var sassSources = ['components/sass/style.scss'];

// Static
var cssSources = [outputDir + 'css/plugins/swiper/css/swiper.css'];
var htmlSources = [outputDir + '*.html'];




/*************************
      SEPARATE TASKS
*************************/

/**** Core ****/

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(gconcat('scripts.js'))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('fontAwesome', function(){
  sass(fontAwesomeSources)
    .on('error', sass.logError)
    .pipe(gulp.dest(outputDir + 'fonts'))
    .pipe(connect.reload())
});

gulp.task('style', function(){
  sass('components/sass/style/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
  gulp.src(htmlSources)
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

/**** Failing ****/

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass/style',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

/*************************
      AUTOMATED TASKS
*************************/

// Watch for changes
gulp.task('watch', function(){
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/style/*.scss', ['style']);
  gulp.watch(htmlSources, ['html']);
});

// Setup a local server to auto reload whenever changes are made to tasks that end with connect.reload()
gulp.task('connect', function(){
  connect.server({
    root: outputDir,
    livereload: true
  });
});

// Auto Open Site
gulp.task('open', ['connect'], function(){
  var options = {
    uri : 'localhost:8080',
    app : browser
  };
  gulp.src(__filename)
  .pipe(open({uri : 'http://localhost:8080'}));
});


gulp.task('default', ['html', 'js', 'style', 'fontAwesome', 'watch', 'connect']);



//     .pipe(browserify())
//    .pipe(gminify())