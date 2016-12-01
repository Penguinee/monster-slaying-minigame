let config = require('config');
let helpers = require('helpers');

module.exports = {
    init(gulp) {
        return helpers.loadTasks(config.init);
    },
    build(gulp) {
        return helpers.loadTasks(config.build);
    },
    watch(gulp) {
        return function () {
            config.watch.forEach((key) => {
                let module = helpers.getModule(key, 'watch');

                gulp.watch(module.path, helpers.loadTasks(module.tasks));
            });
        };
    }
};
