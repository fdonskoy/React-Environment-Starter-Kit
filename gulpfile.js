const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const browserify = require('browserify');
const uglify = require('gulp-uglify-es');

gulp.task('webpack', () => {
  return gulp.src('*.js', {"read":false})
    .pipe(shell([
      'webpack' //run webpack as a task instead of typing webpack in terminal/shell
    ]))
    .pipe(browserSync.stream())
});

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss') //whatever files we run here
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError)) //and run sass on
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    })) //makes css browser compatible like webkit, ms, moz
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css')) //output here
    .pipe(browserSync.stream()) //refreshes page on change
});

gulp.task('sass:minify', () => {
  return gulp.src('./public/css/**/*.css') //whatever files we run here
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css')) //output here
});

gulp.task('production', ['sass:minify'])
// process JS files and return the stream.
// gulp.task('js', () => {
//   return gulp.src('./src/js/**/*.js')
//       // .pipe(browserify())
//       .pipe(uglify())
//       .pipe(gulp.dest('./public/js'))
//       .pipe(browserSync.stream()) //refreshes page on change
// });

gulp.task('browser-sync', () => {
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./public"
      },
      notify: false,
      open: false
  });
});

gulp.task('default', ['sass', 'webpack', 'browser-sync'], () => {
  gulp.watch('./src/scss/**/*', ['sass']);
  gulp.watch('./src/js/**/*', ['webpack']);
  //Need to add image compressing and JS uglify
  // gulp.watch(['./public/**/*', './public/*', '!public/js/**/.#*js', '!public/css/**/.#*css']).on('change', reload)
})
