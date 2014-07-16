var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compressCore', function() {
    gulp.src('src/gameloopjs.core.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(''));
});

gulp.task('compressAll', function() {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename('gameloopjs.min.js'))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['compressCore']);
