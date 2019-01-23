var gulp = require('gulp');
var connect = require('gulp-connect');

// Server
function server() {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
}
gulp.task('connect', function() {

	server();
});