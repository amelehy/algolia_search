module.exports = function(grunt) {

  var jsCompiledDir = 'js/build/';
  var jsSourceDir = 'js/source';
  var applicationJsName = jsCompiledDir + 'application.js';
  // var jsLibs = ['bower_components/react/react.min.js', 'bower_components/react/react-dom.min.js', 'bower_components/babel/index.js']
  var jsLibs = [];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/style.min.css': 'css/style.scss'
        }
      } 
    },
    // clean: [applicationJsName],
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          cwd: jsSourceDir, 
          src: ['**/*.jsx'],
          dest: jsCompiledDir, 
          ext: '.js'
        }]
      }
    },
    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: [jsCompiledDir + '**/*.js'].concat(jsLibs),
        dest: applicationJsName,
      },
    },
    uglify: {
      js: {
        src: applicationJsName, 
        dest: applicationJsName
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: [jsSourceDir + '**/*.jsx'],
        tasks: ['babel', 'concat', 'uglify'],
        options: {
          spawn: false
        },
      }, 
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      } 
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};