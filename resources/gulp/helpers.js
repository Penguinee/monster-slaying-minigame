let browserSync = require('browser-sync');
let gulp        = require('gulp');
let plugins     = require('gulp-load-plugins')();
let path        = require('path');

let getBrowserSync = function(name) {
    if (name === undefined) {
        name = 'default';
    }

    if (browserSync.has(name)) {
        return browserSync.get(name);
    }

    return browserSync.create(name);
}

let getModule = (task, type) => {
    let module = require('tasks/' + task)(gulp, plugins);

    if (type === undefined) {
        return module;
    }

    if (module[type] !== undefined) {
        return module[type];
    }

    console.error(task, type);
};

let includePaths = (packages) => {
    return packages.map((package) => {
        return path.join(__dirname, '../../node_modules', package);
    });
};

let loadTask = (name) => {
    if (gulp.task(name) !== undefined) {
        return;
    }

    let parts = name.split('/');
    gulp.task(name, getModule(parts[0], parts[1]));
};

let loadTasks = (names) => {
    names.forEach((name) => {
        loadTask(name);
    });

    return gulp.parallel(names);
};

module.exports = {
    getBrowserSync: getBrowserSync,
    getModule: getModule,
    includePaths: includePaths,
    loadTask: loadTask,
    loadTasks: loadTasks
}
