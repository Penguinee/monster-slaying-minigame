let del      = require('del');
let helpers  = require('helpers');
let uglifyjs = require('uglify-js-harmony');
let minifier = require('gulp-uglify/minifier');

let config = {
    src      : 'resources/javascript/**/*.js',
    dest     : 'public/js',
    packages : [
        'jquery/dist/jquery.js',
        'tether/dist/js/tether.js',
        'bootstrap/dist/js/bootstrap.js'
    ],
    concatJs: false
};

module.exports = function (gulp, plugins) {
    return {
        clean() {
            return del(`${config.dest}/**/*`);
        },
        build() {
            return gulp.src(config.src)
                .pipe(plugins.if('packages' in config, plugins.addSrc.prepend(helpers.includePaths(config.packages))))
                .pipe(plugins.sourcemaps.init())
                .pipe(minifier({}, uglifyjs))
                .pipe(plugins.if(config.concatJs, plugins.concat('main.min.js')))
                .pipe(plugins.sourcemaps.write('.'))
                .pipe(gulp.dest(config.dest))
                .pipe(helpers.getBrowserSync().stream({
                    match: '**/*.js'
                }));
        },
        watch: {
            path  : config.src,
            tasks : ['javascript/build']
        }
    };
};
