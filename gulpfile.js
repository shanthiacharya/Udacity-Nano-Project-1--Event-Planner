var Firebase = require("firebase");
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
//var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('default',['copy-html','scripts'],function(){

    console.log('Gulp is running correctly')
    gulp.watch('*.html', ['copy-html']);
    gulp.watch('./dist/**/*.*').on('change', browserSync.reload);

    browserSync.init({
        server: './dist'
    });
});

gulp.task('copy-html', function() {

    console.log('Gulp is copying html')
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('dist', [
    'copy-html',
    'scripts'

]);



gulp.task('scripts', function() {
    console.log('Gulp is copying js')
    gulp.src('js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});
