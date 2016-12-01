require('app-module-path').addPath(__dirname + '/resources/gulp');

var gulp = require('gulp');
var tasks = require('tasks');

gulp.task(
    'default',
    gulp.series(
        tasks.init(gulp),
        tasks.build(gulp),
        tasks.watch(gulp)
    )
);
