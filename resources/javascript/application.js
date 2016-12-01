var version = document.getElementById('requireJs').getAttribute('data-version');

requirejs.config({
    deps:    ['bootstrap'],
    paths:   {},
    shim:    {
        'bootstrap': ['jquery', 'tether']
    },
    urlArgs: 'v=' + version
});

require(['tether'], function(Tether) {
    window.Tether = Tether;
    return Tether;
});

requirejs(['app/main']);
