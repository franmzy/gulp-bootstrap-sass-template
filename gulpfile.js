var gulp = require('gulp'),
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower');

var liveReload = require('./liveReload.js');

var config = { 
    sassPath: './scss',
     bowerDir: './assets' ,
    fontsDest: './fonts',
    cssDest: './css'
}

gulp.task('bower', function() { 
    return bower() .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest(config.fontsDest)); 
});

gulp.task('sass', function() {
    return sass(config.sassPath + '/style.scss', {
            style: 'compressed',
             loadPath: [ 
                config.sassPath,  
                config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',  
                config.bowerDir + '/fontawesome/scss'
            ] 
        }).on('error', notify.onError(function (error) {
            return "Error: " + error.message;
         }))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task('install', ['bower', 'icons', 'sass']);
 
gulp.task('default', function() { 
  	// Rerun the task when a file changes
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']); 
    // LiveReload
    liveReload.startSync();
});
