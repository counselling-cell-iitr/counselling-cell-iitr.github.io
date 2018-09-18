
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

        copy: {
            main: {
                files: [
                    // includes files within path 
                    { expand: true, src: ['assets/fonts/*', 'assets/json/*', 'assets/images/*'], dest: 'dist/' }
                ],
            },
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
                    'dist/assets/javascripts/prod/script.js': ['dist/assets/javascripts/prod/concatenated.js']
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
                src: ['dist/assets/javascripts/prod/script.js', 'dist/assets/stylesheets/prod/style.css'],
                dest: ['distportfolios/porfolio-*.html', 'dist/index.html']
            }
        },

        clean: {
            production: ['dist/assets/javascripts/prod/*.js', 'dist/assets/stylesheets/prod/*.css', 'dist/*.html', 'dist/assets/*']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: ['portfolios/*.html', 'index.html', 'team_page.html'],
                    dest: 'dist'
                }]
            },
        }
    });

    grunt.registerTask("default", ['env:' + config.environment, 'clean:' + config.environment, 'copy', 'concat:' + config.environment, 'cssmin:' + config.environment, 'uglify:' + config.environment, 'htmlmin', 'hashres:' + config.environment]);
};
