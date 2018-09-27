module.exports = function (grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var config = grunt.file.readJSON('config.json');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        env: {
            development: {
                NODE_ENV: 'development',
                DEST: 'dev'
            },
            production: {
                NODE_ENV: 'production',
                DEST: 'prod'
            }
        },

        jshint: {
            development: ['main.js'],
            production: []
        },

        concat: {
            development: {
                files: {
                    'assets/stylesheets/dev/concatenated.css': 'app/assets/stylesheets/*.css',
                    'assets/javascripts/dev/concatenated.js': 'assets/javascripts/*.js'

                }
            },
            production: {
                files: {
                    'app/assets/stylesheets/prod/concatenated.css': 'app/assets/stylesheets/*.css',
                    'app/assets/javascripts/prod/concatenated.js': 'assets/javascripts/*.js'
                }
            }
        },

        cssmin: {
            development: {},
            production: {
                src: 'app/assets/stylesheets/prod/concatenated.css',
                dest: 'app/assets/stylesheets/prod/style.css'
            }
        },

        uglify: {
            development: {},
            production: {
                files: {
                    'app/assets/javascripts/prod/script.js': ['assets/javascripts/dev/conactenated.js']
                }
            }
        },
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFiles: true
            },
            development: {
                src: [],
                dest: []
            },
            production: {
                src: [],
                dest: []
            }
        },

        clean: {
            development: ['assets/javascripts/dev/*.js', 'assets/stylesheets/dev/*.css'],
            production: ['assets/javascripts/prod/*.js', 'assets/stylesheets/prod/*.css']
        },

        htmlmin: {
            file: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    src: '',
                    dest: ''
                }
            }
        }

    });

    grunt.registerTask('default', ['env:' + config.environment, 'clean:' + config.environment, 'stylus', 'jshint:' + config.environment, 'concat:' + config.environment, 'cssmin:' + config.environment, 'uglify:' + config.environment, 'preprocess', 'hashres:' + config.environment]);

};