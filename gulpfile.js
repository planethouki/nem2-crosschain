const gulp = require("gulp");
const browserify = require("browserify");
const fs = require("fs");
const superstatic = require('superstatic');

gulp.task("build", function() {
    const out = fs.createWriteStream('./main.js');

    browserify({
        entries: ['main.src.js']
    })
        .bundle()
        .pipe(out);
});

gulp.task("serve", 　["build"], function () {
    superstatic.server({
        port:3000
    }).listen();
});

gulp.task("watch", 　["serve"], function () {
    gulp.watch("./main.js", ["build"]);
});