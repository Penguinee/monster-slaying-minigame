let autoprefixer = require('autoprefixer');
let bem = require('postcss-bem');
let del = require('del');
let helpers = require('helpers');

let config = {
    src      : 'resources/css/**/*.scss',
    dest     : 'public/css',
    packages : [
        'bourbon/app/assets/stylesheets',
        'font-awesome/scss',
        'bootstrap/scss'
    ],
    processors: [
        autoprefixer({
            browsers: ['last 2 versions']
        }),
        bem({
            style: 'suit'
        })
    ]
};

module.exports = function (gulp, plugins) {
    return {
        clean() {
            return del(`${config.dest}/**/*`);
        },
        build() {
            return gulp.src(config.src)
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass({
                    includePaths: helpers.includePaths(config.packages)
                }))
                .pipe(plugins.postcss(config.processors))
                .pipe(plugins.cleanCss())
                .pipe(plugins.sourcemaps.write('.'))
                .pipe(gulp.dest(config.dest))
                .pipe(helpers.getBrowserSync().stream({
                    match: '**/*.css'
                }));
        },
        watch: {
            path  : config.src,
            tasks : ['css/build']
        }
    };
};
