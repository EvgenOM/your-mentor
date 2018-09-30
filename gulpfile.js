const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const del = require('del');
const serv = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('app/sass/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('pug', function() {
    return gulp.src('app/pug/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('public/'));
});

gulp.task('clear', function() {
    return del(['public/css', 'public/js', 'public/index.html', '!public/src']);
});

gulp.task('build',gulp.series('clear', gulp.parallel('sass', 'pug')));

gulp.task('serv', call => {
    serv.init({
        server: "./public"
    });

    serv.watch('./public/**/*.*').on('change', serv.reload);
    call();
});

gulp.task('watch', call => {
    gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('app/pug/**/*.pug', gulp.series('pug'));
    call();
});

gulp.task('dev', gulp.series('build', gulp.parallel('serv', 'watch')));