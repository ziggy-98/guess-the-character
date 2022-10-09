
module.exports = function(grunt) {
    grunt.initConfig({
      sass: {
        dist: {
          options: {
            sourcemap: 'none',
            compress: false,
            yuicompress: false,
            style: 'compressed',
          },
          files: {
            'client/src/index.css' : 'client/src/scss/global.scss',
          }
        },
      },
      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['sass']
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
  }