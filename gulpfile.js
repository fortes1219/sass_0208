const gulp = require('gulp')       // 載入 gulp
const gulpSass = require('gulp-sass')  // 載入 gulp-sass
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const connect = require('gulp-connect')
const sourcemaps = require("gulp-sourcemaps")

function styles() {
	return (
		gulp
			// 指定要處理的 Scss 檔案目錄
			.src("./src/scss/**/*.scss")
			.pipe(sourcemaps.init())
			// 編譯 Scss
			.pipe(gulpSass({
				outputStyle: 'compressed'
			}))

			.on("error", gulpSass.logError)
			.pipe(sourcemaps.write())
			// 指定編譯後的 css 檔案目錄
			.pipe(gulp.dest("./src/css"))
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	});
	gulp.watch('./src/scss/**/*.scss', styles)
	gulp.watch("./src/**/*.html", reload);
}

function reload() {
	browserSync.reload();
}

exports.watch = watch
exports.styles = styles;