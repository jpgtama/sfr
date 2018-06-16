/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch');
    setupConfig = require('./SetupConfig.js');


gulp.task('copy', function(){
  // copy to build
  return gulp.src('src/**/*.*').pipe(setupConfig()).pipe(gulp.dest('build'));
});

// gulp.task('setupConfig', function(done){
//   // set up config
//   setupConfig.run();
//   done();
// });

gulp.task('build',gulp.series('copy'));


// create a default task
gulp.task('default', gulp.series('build'));

// dev task
var source = './src',
    destination = './build';

gulp.task('watch', function(done) {
  gulp.src(source + '/**/*', {base: source})
    .pipe(setupConfig())
    .pipe(watch([source, '!fe/styles/.sass-cache/**/*'], {base: source}))
    .pipe(gulp.dest(destination));


  done();
});
