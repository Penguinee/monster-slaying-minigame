let del = require('del');
let fs = require('fs');
let helpers = require('helpers');
let requireNew = require('require-new');

function getMatchingDataFile(file) {
    let dataFile = file.path.replace('.html', '.json');

    if (fs.existsSync(dataFile)) {
        return requireNew(dataFile);
    }

    dataFile = dataFile.replace('html\\pages', 'html\\data').replace('html/pages', 'html/data');

    return fs.existsSync(dataFile) ? requireNew(dataFile) : {};
}

let config = {
    src   : 'resources/html/pages/**/*.html',
    dest  : 'public/clickdummy',
    watch : 'resources/html/**/*.@(html|nunjucks|json)',
    settings() {
        return {
            path       : 'resources/html/templates',
            data       : require('require-new')('../../html/data/_global.json'),
            envOptions : {
                throwOnUndefined : true,
                noCache          : true
            }
        };
    }
};

module.exports = function (gulp, plugins) {
    return {
        clean() {
            return del(`${config.dest}/**/*`);
        },
        build() {
            return gulp.src(config.src)
                .pipe(plugins.data(getMatchingDataFile))
                .pipe(plugins.nunjucksRender(config.settings()))
                .pipe(gulp.dest(config.dest))
                .pipe(helpers.getBrowserSync().stream());
        },
        watch: {
            path  : config.watch,
            tasks : ['nunjucks/build']
        }
    };
};
