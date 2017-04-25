/**
 * Created by DAVIM on 13/04/2017.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const jsdoc = require('gulp-jsdoc3');

let paths = {
    scripts: ['js/**/*.js'],
    css: 'css/**/*'
};

gulp.task('doc',function(cb) {
    gulp.src(['README.md','js/app4.0.js'], {read: true})
    .pipe(jsdoc(cb));
});
gulp.task('app', function () {
    return gulp.src('js/app4.0.js')
        .pipe(babel())
        .pipe(gulp.dest('preflight'));
});
gulp.task('webpack', function () {
    return gulp.src('preflight/app4.0.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/bundle.js'));
});
gulp.task('globals', function () {
    return gulp.src('js/globals.js')
        .pipe(babel())
        .pipe(gulp.dest('preflight'));
});
gulp.task('default', ['app', 'globals', 'webpack', 'doc']);