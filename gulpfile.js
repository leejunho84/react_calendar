"use strict";

const gulp = require('gulp');
const express = require('express');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const path = require('path');
const browserSync = require('browser-sync');
const app = express();
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');


app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.get('', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

gulp.task('webserver', function(){
	app.listen(4000);
	browserSync({
		proxy:'localhost:4000'
	});
});

gulp.task('browserify', function(){
	browserify('./src/index.js')
	.transform('babelify', {presets:['react', 'es2015']})
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true, debug: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./js/'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function(){
	gulp.watch(['*.js', './src/**/*.js'], ['browserify']);
});

gulp.task('default', ['webserver', 'browserify', 'watch']);
//gulp.task('default', ['webserver']);