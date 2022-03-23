const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');


function sassCompile() {
	return gulp.src('app/sass/*.+(scss|sass)')
		.pipe(sass())
		.on("error", notify.onError())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
}

function pugCompile() {
	return gulp.src('app/*.pug')
		.pipe(pug({
			pretty: false
		}))
		.on('error', function (err) {
			process.stderr.write(err.message + '\n');
			this.emit('end');
		})
		.on("error", notify.onError())
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}, 
		notify: false,
		online: true,
	});
	gulp.watch('app/sass/**/*.+(scss|sass)', sassCompile);
	gulp.watch('app/**/*.pug', pugCompile);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/css/*.css').on('change', browserSync.reload);
}

function deleteDist() {
	return del.sync('dist');
}

function imagesMinification() {
	return gulp.src(['app/assets/**/*', '!app/assets/*.svg', '!app/assets/*.webp'])
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [
				{removeViewBox: false},
				{cleanupIDs: false},
				{removeUselessStrokeAndFill: false},
				{interlaced: false},
				{progessive: false},
				{optimizationLevel: 0}
			],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/assets'));
}

function build() {
	deleteDist();
	imagesMinification();

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/media.css',
		'app/css/keyframes.css',
		'app/css/fonts.css',
		'app/css/normalize.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildSVGs = gulp.src('app/assets/*.svg')
	.pipe(gulp.dest('dist/assets'))

	var buildWEBPs = gulp.src('app/assets/*.webp')
	.pipe(gulp.dest('dist/assets'))

	var buildFonts = gulp.src('app/fonts/!Fonts/**')
	.pipe(gulp.dest('dist/fonts'))

	var buildLibs = gulp.src('app/libs/!Libs/**')
	.pipe(gulp.dest('dist/libs'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))

	var robotsTXT = gulp.src('app/robots.txt')
	.pipe(gulp.dest('dist'));
}

exports.watch = watch;
exports.build = build;