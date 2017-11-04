const gulp = require("gulp");
const sass = require("gulp-sass");
const minify = require("gulp-uglify");
const copy = require("gulp-copy");
const imageMin = require("gulp-imagemin");
const webserver = require("gulp-webserver"); 

gulp.task("copy",() => {
	gulp.src("src/*.html").pipe(gulp.dest("built"));
});

gulp.task("sass",() => {
	gulp.src("src/sass/*.css").pipe(sass()).pipe(gulp.dest("built/css"));
});

gulp.task("minify",() => {
	gulp.src("src/js/*.js").pipe(minify()).pipe(gulp.dest("built/js"));
});

gulp.task("imageMin",() => {
	gulp.src("src/img/*").pipe(imageMin()).pipe(gulp.dest("built/img"));
});

gulp.task("watch",() => {
	gulp.watch("src/*.html",["copy"]);
	gulp.watch("src/sass/*.css",["sass"]);
	gulp.watch("src/js/*.js",[minify]);
});

gulp.task("webserver",() => {
	return gulp.src("built")
	           .pipe(webserver({
	           	  port:4000,
	           	  livereload:true,
	              open:true
	           }))
	           
});

gulp.task("default",["copy","sass","minify","imageMin","watch","webserver"]);