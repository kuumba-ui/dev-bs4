/**
 * Created by ashleighhenry on 18/07/16.
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const htmlPartial = require('gulp-html-partial');

gulp.task('html', function () {
    gulp.src(['src/*.html'])
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulp.dest('dist'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'html'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("../src/sass/**/*.scss", ['sass']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});
gulp.task('html:watch', function(){
   gulp.watch('./src/**/*.html', ['html']);
});
gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['serve','sass:watch','html:watch']);