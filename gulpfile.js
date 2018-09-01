const gulp = require("gulp");
const browserify = require("browserify");
const fs = require("fs");
const superstatic = require('superstatic');
const pug = require('pug');

gulp.task("build", function() {
    const out = fs.createWriteStream('./js/main.js');
    browserify({
        entries: ['./js/main.src.js']
    })
    .bundle()
    .pipe(out);

    const rawHtml = pug.renderFile('./pug/index.pug');
    fs.writeFileSync('./index.html', rawHtml);
});

gulp.task("serve", 　["build"], function () {
    superstatic.server({
        port:3000
    }).listen();
});

gulp.task("watch", 　["serve"], function () {
    gulp.watch(["./js/main.src.js", "./pug/index.pug"], ["build"]);
});