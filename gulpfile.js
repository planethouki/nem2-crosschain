const gulp = require("gulp");
const fs = require("fs");
const superstatic = require('superstatic');
const pug = require('pug');

gulp.task("build", function(done) {
    const rawHtml = pug.renderFile('./pug/index.pug');
    fs.writeFileSync('./index.html', rawHtml);
    done();
});

gulp.task('serve', function(){
    superstatic.server({
        port:3000
    }).listen();
});


gulp.task('watch', gulp.parallel( gulp.task('serve'), function(){
    gulp.watch(["./pug/index.pug", "./pug/layout.pug"], gulp.task("build"));
}));
