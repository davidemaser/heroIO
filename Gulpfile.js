/**
 * Created by DAVIM on 13/04/2017.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const jsdoc = require('gulp-jsdoc3');

let paths = {
    scripts: ['js/**/*.js'],
    css: 'css/**/*'
};

gulp.task('doc',function(cb) {
    gulp.src(['README.md','js/app4.0.js'], {read: true})
    .pipe(jsdoc(cb));
});
gulp.task("default", function () {
    return gulp.src("js/app4.0.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});