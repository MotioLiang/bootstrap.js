const gulp = require("gulp");
const copy = require("gulp-copy");
const sass = require("gulp-sass");
const minify = require("gulp-uglify");
const webserver = require("gulp-webserver");

/*
    ------ 常用方法
    gulp.task  :定义任务
    gulp.src   :输入的文件路径
    gulp.dest  :输出的文件路径
    gulp.watch :监听文件变化

    ----- node方法
    pipe       :管道
*/

// 拷贝
gulp.task("copy",() => {
	gulp.src("src/*.html").pipe(gulp.dest("built"));
});

// 压缩js
gulp.task("sass",() => {
	gulp.src("src/sass/*.scss").pipe(sass()).pipe(gulp.dest("built/css"));
});

// sass转css
gulp.task("minify",() => {
	gulp.src("src/js/*.js").pipe(minify()).pipe(gulp.dest("built/js"));
});

// 监听任务
gulp.task("watch",function () {
	gulp.watch("src/js/*.js",["min0ify"]);
	gulp.watch("src/sass/*.scss",["sass"]);
	gulp.watch("src/*.html",["copy"]);
});

// 默认执行
gulp.task("default",["sass","minify","copy","watch","webserver"]);

//构建本地服务器
gulp.task("webserver",() => {
	return gulp.src("built")
	           .pipe(webserver({
	           	    port:4000,
	                livereload:true,
	                open:true
	           }));
});





