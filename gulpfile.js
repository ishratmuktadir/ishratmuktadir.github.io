let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('copyFiles', function() {
    gulp.src('app/**/*.*')
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    browser: 'google chrome'
  })
});

gulp.task('watch', ['sass', 'copyFiles', 'browserSync'], function() {
    gulp.watch('app/*.html', ['copyFiles']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});