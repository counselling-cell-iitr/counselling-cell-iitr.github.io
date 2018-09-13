const mozjpeg = require('imagemin-mozjpeg');

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

        copy: {
            main: {
                files: [
                    // includes files within path 
                    { expand: true, src: ['assets/fonts/**/*', 'assets/json/**/*', 'assets/images/**/*' , 'index.html', 'portfolios/*'], dest: 'dist/' }
                ],
            },
        },

        concat: {
            target: {
                files: {
                    'dist/assets/stylesheets/prod/concatenated.css': ['assets/stylesheets/team.css', 'assets/stylesheets/responsive.css', 'assets/stylesheets/main.css', 'assets/stylesheets/lightbox.css', 'assets/stylesheets/font-awesome.min.css'],
                    'dist/assets/stylesheets/prod/compressedMin.css': ['assets/stylesheets/bootstrap.min.css', 'assets/stylesheets/font-awesome.min.css', 'assets/stylesheets/animate.min.css', 'assets/stylesheets/preset.css'],
                    'dist/assets/javascripts/prod/script.js': 'assets/javascripts/*.js',
                    'dist/assets/javascripts/prod/jquery.js': 'assets/javascripts/jquery/jquery.js'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/assets/stylesheets/prod/style.css': 'dist/assets/stylesheets/prod/concatenated.css',
                    'dist/assets/stylesheets/prod/min.css': 'dist/assets/stylesheets/prod/compressedMin.css',
                }
            }
        },

        uglify: {
            development: {},
            production: {
                files: {
                    'dist/assets/javascripts/prod/script.js': ['dist/assets/javascripts/prod/script.js'],
                    'dist/assets/javascripts/prod/jquery.js': ['dist/assets/javascripts/prod/jquery.js']
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
                src:[], 
                dest: []
            },
            production: {
                src: ['dist/assets/javascripts/prod/script.js', 'dist/assets/javascripts/prod/jquery.js', 'dist/assets/stylesheets/prod/style.css', 'dist/assets/stylesheets/prod/min.css'],
                dest: ['dist/portfolios/porfolio-*.html', 'dist/index.html']
            }
        },

        clean: {
            production: ['dist/assets/javascripts/prod/*.js', 'dist/assets/stylesheets/prod/*.css', 'dist/*.html', 'dist/assets/*', 'dist/portfolios'],
            development: ['dist/assets/javascripts/prod/*.js', 'dist/assets/stylesheets/prod/*.css', 'dist/*.html', 'dist/assets/*', 'dist/portfolios']
        },

        htmlmin: {
            development: {},
            production: {
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
                }
            }
        },

        imagemin: {
            static: {
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()] // Example plugin usage 
                },
                files: [{
                    expand: true,
                    src: ['assets/images/**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        }

    });

    grunt.registerTask("default", ['env:' + config.environment, 'clean:' + config.environment, 'copy', 'concat:target', 'cssmin', 'uglify:' + config.environment, 'htmlmin:' + config.environment, 'hashres:' + config.environment, "imagemin"]);
};
