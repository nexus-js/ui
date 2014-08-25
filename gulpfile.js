var gulp = require('gulp')
  , rename = require('gulp-rename')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , runSequence = require('run-sequence')
var path = require('path');

var watcher = gulp.watch(['lib/**/*.js'], ['default'])
watcher.on('change', function(event) {
  console.log('File '+event.path+' was '+event.type+', running tasks...')
})

gulp.task('concat', function() {
  return gulp.src([
      './dependencies/eventemitter2.js',
      './lib/core.js',
      './lib/widgets/*.js'
    ])
    .pipe(concat('./dist/nexusUI-latest.js', { newLine: ';' }))
    .pipe(gulp.dest('.'))
})

gulp.task('uglify', function() {
  return gulp.src('./dist/nexusUI-latest.js')
    .pipe(uglify())
    .pipe(rename('nexusUI-latest.min.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', function(done) {
  runSequence('concat', 'uglify', done)
})