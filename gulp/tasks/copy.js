const config = require('../config');
const gulp = require('gulp');

gulp.task('copyStyleguide', ['styleguide'], () => {
    gulp.src(`${config.STYLEGUIDE_BASE}/*`)
        .pipe(gulp.dest(config.STYLEGUIDE_DEST));
});

gulp.task('copyJsTemplates', () => {
    const jsTemplates = gulp.src(`${config.JS_TEMPLATES}/*`)
        .pipe(gulp.dest(`${config.JS_TEMPLATES_BUILD}`));

    return jsTemplates;
});
