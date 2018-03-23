'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const htmlPartial = require('gulp-html-partial');
const autoprefixer = require('gulp-autoprefixer');
const htmlbeautify = require('gulp-html-beautify');

gulp.task('html', function () {
    gulp.src(['./src/*.html'])
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulp.dest('./'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'html'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("/src/scss/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('prefix', function(){
    return gulp.src('./css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('/css'))
});

//gulp.task('css', function(){
//    return gulp.src('./vendor/**/*.css')
//        .pipe(gulp.dest('./css'))
//});

gulp.task('html:watch', function(){
    gulp.watch('./src/**/*.html', ['html']);
});
gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
    gulp.watch('./js/**/*.js', ['js']);
});
gulp.task('js', function(){
    return gulp.src('./js/**/*.js')
        .pipe(gulp.dest("./js"))
        .pipe(browserSync.stream());
});


gulp.task('htmlbeautify', function() {
    let options = {
        indentSize: 4,
        preserve_newlines: false
    };
    gulp.src('./*.html')
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['serve','sass:watch','html:watch','js:watch','htmlbeautify']);