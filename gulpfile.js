var gulp = require( 'gulp' ),	
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	inlineCss = require('gulp-inline-css'),
	styleInject = require('gulp-style-inject'),
	browserSync = require('browser-sync').create();

gulp.task('inliner',['style'], function () {
    return gulp.src('./dist/index.html')
        .pipe(inlineCss({
        	preserveMediaQueries: true,
        	removeStyleTags: false,
        	}))
        .pipe(gulp.dest('./dist'));
	});

gulp.task('style',['autoprefixer'], function() {
	return gulp.src("./src/index.html")
	    .pipe(styleInject())
	    .pipe(gulp.dest("./dist"));
	});

gulp.task('autoprefixer', ['sass'], function() {
	return gulp.src('./stylesheets/email.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('./src'))
	});

gulp.task('sass', function() {
	return gulp.src('./sass/email.scss')
		.pipe(sass())
		.pipe(gulp.dest('./stylesheets'))
	});

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: "./dist"
      }
    });
    gulp.watch(['./dist/index.html']).on("change", browserSync.reload);
  });

gulp.task('watch', function() {
	gulp.watch(['./src/index.html','./sass/*.scss'], ['inliner']);
	});

gulp.task('dev', ['watch','browser-sync']);

gulp.task('default', ['inliner']);