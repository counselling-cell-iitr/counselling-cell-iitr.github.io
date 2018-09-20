module.exports = function (grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var config = grunt.file.readJSON('config.json');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        env: {
            production: {
                NODE_ENV: 'production',
                DEST: 'dist'
            }
        },


        concat: {
            production: {
                files: {
                    'dist/assets/stylesheets/prod/concatenated.css': ['assets/stylesheets/*.css', 'assets/stylesheets/presets/*.css'],
                    'dist/assets/javascripts/prod/concatenated.js': 'assets/javascripts/*.js'
                }
            }
        },

        cssmin: {
            production: {
                src: 'dist/assets/stylesheets/prod/concatenated.css',
                dest: 'dist/assets/stylesheets/prod/style.css'
            }
        },

        uglify: {
            production: {
                files: {
                    'dist/assets/javascripts/prod/script.js': ['assets/javascripts/prod/conactenated.js']
                }
            }
        },
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFiles: true
            },
            production: {
                src: ['assets/javascripts/prod/*.js', 'assets/stylesheets/prod/*.js'],
                dest: ['porfolios/porfolio-*.html', 'index.html']
            }
        },

        clean: {
            production: ['dist/assets/javascripts/prod/*.js', 'dist/assets/stylesheets/prod/*.css', 'dist/*.html']
        },

        htmlmin: {
            production: {
                file: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        src: ['porfolios/porfolio-*.html', 'index.html'],
                        dest: 'dist/'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['env:' + config.environment,
                                    'clean:' + config.environment,
                                    'concat:' + config.environment,
                                    'cssmin:' + config.environment,
                                    'uglify:' + config.environment,
                                    'hashres:' + config.environment,
                                    'hashres' + config.environment]);

};