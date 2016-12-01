module.exports = {
    init: [
        'css/clean',
        'javascript/clean',
        'nunjucks/clean',
        'browsersync/init'
    ],
    build: [
        'css/build',
        'javascript/build',
        'nunjucks/build'
    ],
    watch: [
        'css',
        'javascript',
        'nunjucks'
    ]
};
