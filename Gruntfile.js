'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'lib/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'xunit',
          captureFile: 'target/js-test-reports/xunit.xml'
        },
        src: ['test/**/*.js']
      }
    },

    // Configuration to be run (and then tested).
    'sg_release': {
      options: {
        skipBowerInstall: true,
        developBranch: 'develop',
        masterBranch: 'master',
        files: [
          'package.json',
          'README.md'
        ],
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        pushTo: 'origin'
      }
    },

  });

  grunt.registerTask('release', ['sg_release']);

  grunt.registerTask('test', 'mochaTest');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
