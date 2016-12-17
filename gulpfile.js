

/**
 * GULPFILE
 * Module to run tasks automatically on file save (compile, minify...)
 * @namespace GULP
 * @module GULP
 */


/**
 * List of dependencies
 * @memberOf GULP
 * @type {String}
 */
var gulp   = require('gulp'),
    cache  = require('gulp-cache-bust'),
    change = require('gulp-changed'),
    coffee = require('gulp-coffee'),
    clint  = require('gulp-coffeelint'),
    concat = require('gulp-concat'),
    fs     = require('fs'),
    gulpJade   = require('gulp-jade'),
    // gutil   = require('gulp-util'),
    jade   = require('jade'),
    less   = require('gulp-less'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    notify = require('gulp-notify'),
    plumber= require('gulp-plumber'),
    sass   = require('gulp-sass'),
    server = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    watch  = require('gulp-watch');


/**
 * List of routes
 * @memberOf GULP
 * @type {String}
 */
var source = './source/',
    public = './public/',
    bower  = './public/bower_components/';

/**
 * Check if file really exist before execute GULP
 * @param  {Array} list List of file paths
 * @return {Boolean}      File exist or not
 */
var check = function(list){
    var correct=true;
    for(var i=0,l=list.length; i<l; i++){
        try{
            fs.statSync(list[i]);
        }
        catch(error){
            console.log(list[i] + ' file does not exist');
            correct=false;
            break;
        }
    }
    return correct;
}

/**
 * ERROR HANDLER FOR COFFEE TASKS
 * @memberOf GULP
 * @method coffee_error
 * @param {Object} error_object Error object
 * @return {null} Print error from plumber on console
 */
var coffee_error = function(error){
    delete error.code;
    console.log(error);
};

/**
 * COFFEE TASK TO COMPILE ANGULAR FILES
 * @memberOf GULP
 * @method angular_coffee
 */
gulp.task('coffee', function() {
    gulp.src( source + 'coffee/**/*.coffee')
        .pipe(plumber({errorHandler: coffee_error}))
        .pipe(clint())
        .pipe(clint.reporter())
        .pipe(coffee({ bare: true }))
        .pipe(ngAnnotate())
        .pipe(concat('angular_scripts.js'))
        .pipe(gulp.dest( public + 'js/'))
        .pipe(livereload())
        .pipe(notify({
            onLast: true,
            message: 'angular_coffee done!'
        }));
});



// define tasks here
gulp.task('scss', function(){
    gulp.src( source + 'scss/style.scss')
        .pipe(plumber({errorHandler: jade_error}))
        .pipe(sass())
        .pipe(gulp.dest(public + 'css'))
        .pipe(livereload())
        .pipe(notify({
            onLast: true,
            message: 'angular_coffee done!'
        }));
});



/**
 * ERROR HANDLER FOR JADE TASKS
 * @memberOf GULP
 * @method jade_error
 * @param {Object} error_object Error object
 * @return {null} Print error from plumber on console
 */
var jade_error = function(error){
    console.log(error.toString());
};

/**
 * JADE TASK TO COMPILE JADE FILES
 * @memberOf GULP
 * @method jade_login
 */
gulp.task('jade', function() {
    gulp.src([ source + 'index.jade', source + 'templates/**/*.jade'], {base: source})
        .pipe(change( public + 'templates/' , {extension: '.html'}))
        .pipe(plumber({errorHandler: jade_error}))
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(cache({ type: 'timestamp' }))
        .pipe(gulp.dest( public ))
        .pipe(livereload())
        .pipe(notify({
            onLast: true,
            message: 'Jade compiled'
        }));
});


/**
 * Compile minified and concatenate amgular modules
 * @memberOf GULP
 * @method modules
 */
gulp.task('modules', function() {    

    var js_src = [
        bower + 'angular-sanitize/angular-sanitize.min.js',

        bower + 'angular-ui-router/release/angular-ui-router.min.js',
        bower + 'angularfire/dist/angularfire.min.js',
        
        bower + 'ng-file-upload/ng-file-upload-all.min.js',
        bower + 'ng-img-crop/compile/minified/ng-img-crop.js'

    ];

    if(check(js_src)){
        gulp.src(js_src)
            .pipe(concat('angular_modules.js'))
            .pipe(gulp.dest( public + 'js/'))
            .pipe(livereload())
            .pipe(notify({
                onLast: true,
                message: 'angular JS done!'
            }));
    }


    var css_src = [
        bower + 'ng-img-crop/compile/minified/ng-img-crop.css'
    ];

    if(check(css_src)){
        gulp.src(css_src)
            .pipe(concat('angular_modules.css'))
            .pipe(gulp.dest( public + 'css/'))
            .pipe(livereload())
            .pipe(notify({
                onLast: true,
                message: 'angular CSS done!'
            }));
    }
});

/**
 * Run server
 * @memberOf GULP
 * @method server
 */
gulp.task('server', function() {
    gulp.src('./public/')
        .pipe(server({
            livereload      : true,
            open            : true,
            directoryListing: {
                enable  : false,
                path    : 'public'
            }
        })
    );
});

/**
 * Watch files to run tasks on files change
 * @memberOf GULP
 * @method watch
 */
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch( source + 'scss/**/*.scss',      ['scss']    );
    gulp.watch( source + 'coffee/**/*.coffee',  ['coffee']  );
    gulp.watch( source + 'templates/**/*.jade', ['jade']    );
    gulp.watch( source + 'index.jade',          ['jade']    );
});

/**
 * DEFAULT TASKS + SERVER
 * @memberOf GULP
 * @method Default
 */
gulp.task('withserver', ['watch', 'server'] );

/**
 * DEFAULT TASKS
 * @memberOf GULP
 * @method Default
 */
gulp.task('default', ['watch'] );