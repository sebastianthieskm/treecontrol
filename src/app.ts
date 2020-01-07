require.config({
    baseUrl: 'scripts/',
    paths: {},
    shim: {}
    });
    // load AMD module main.ts (compiled to main.js)
    require(['main'],(Main:any) => {
        var main = new Main();
        main.run();
    });