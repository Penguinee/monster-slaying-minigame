let helpers = require('helpers');
let path = require('path');

let config = {
    server: {
        baseDir   : 'public',
        index     : 'index.html',
        directory : true
    },
    proxyx: {
        target: `https://${path.basename(process.cwd())}.secure.local`
    }
};

module.exports = function (gulp, plugins) {
    return {
        init(cb) {
            helpers.getBrowserSync().init(config);
            cb();
        }
    };
};
