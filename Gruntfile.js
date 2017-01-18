'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        //pkg: grunt.file.readJson('package.json'),

        dist: {
            options: {},
            files: {
                'dist': ['dist/application.js', 'dist/application.min.1.30.css', 'dist/application.min.1.30.js'],
            },
        },

        copy: {
            dist: {
                cwd: 'modules',
                src: ['**/**'],
                dest: 'dist',
                expand: true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'modules/application.js'
            ]
        },
        concat: {
            plugin: {
                src: ['modules/**/**/*.js'],
                dest: 'dist/application.js'
            },
            css: {
                src: ['modules/**/**/*.css'],
                dest: 'dist/application.min.1.30.css'
            }
        },
        uglify: {
            plugin: {
                src: ['dist/application.js'],
                dest: 'dist/application.min.1.30.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-dist');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

   // grunt.registerTask('travis', ['jshint']);
    grunt.registerTask('default', [
        'dist',
        'copy',
        'jshint',
        'concat',
        'uglify'
    ]);
};