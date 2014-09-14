// Karma configuration
// Generated on Tue Jun 17 2014 20:50:51 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'commonjs'],


    // list of files / patterns to load in the browser
    files: [
      'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
	  'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js',
	  'site/public/dist/js/readmore.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular-mocks.js',
	  'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular-route.js',
	  'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular-sanitize.js',
	  'site/public/dist/js/angular-local-storage.min.js',
      'site/public/dist/js/bootstrap-datepicker.js',
      'site/public/dist/ckeditor/ckeditor.js',
      'node_modules/expect.js/index.js',
      'node_modules/sinon/lib/sinon.js',
      'node_modules/sinon/lib/sinon.js',
      'node_modules/sinon/lib/sinon/call.js',
      'node_modules/sinon/lib/sinon/spy.js',
      'node_modules/sinon/lib/sinon/behavior.js',
      'node_modules/sinon/lib/sinon/stub.js',
      'node_modules/sinon/lib/sinon/mock.js',
      'node_modules/sinon/lib/sinon/collection.js',
      'node_modules/sinon/lib/sinon/assert.js',
      'node_modules/sinon/lib/sinon/sandbox.js',
      'node_modules/sinon/lib/sinon/test.js',
      'node_modules/sinon/lib/sinon/test_case.js',
      'node_modules/sinon/lib/sinon/assert.js',
      'node_modules/sinon/lib/sinon/match.js',

      'site/public/assets/js/Common/**/*.js',
      'site/public/assets/js/Client/**/*.js',
      'site/public/assets/js/Tests/Client/**/*.js',
    ],


    // list of files to exclude
    exclude: [
      //'site/public/assets/js/Client/Impl/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'site/public/assets/js/Common/**/*.js': ['commonjs'],
        'site/public/assets/js/Client/Impl/*.js': ['commonjs'],
        'site/public/assets/js/Client/*.js': ['commonjs', 'coverage'],
        'site/public/assets/js/Tests/Client/**/*.js': ['commonjs']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'html'],

    htmlReporter: {
        outputDir: 'TestResults/Client/'
	},

	coverageReporter: {
	    type: 'lcov',
        dir: 'TestResults/Client/coverage/'
	},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    autoWatchBatchDelay: 1000,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
