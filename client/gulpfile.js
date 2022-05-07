const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const buildStyles = () => {
    return src('src/styles/sass/**/*.scss')
        .pipe(sass())
        .pipe(dest('src/styles/css'));
};

const watchTask = () => {
    watch(['src/styles/sass/**/*.scss'], buildStyles);
};

exports.default = series(buildStyles, watchTask);