/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-yui-compressor');
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    clean: {
      folder: ["public/css/", "public/img"]
    },
    coffee: {
      modules: {
        src: ['*.coffee', 'config/**/*.coffee', 'app/**/*.coffee']
      }
    },
    compass: {
      dev: {
        src: 'app/assets/styles/',
        dest: 'app/assets/styles/',
        outputstyle: 'expanded',
        linecomments: true
      }
    },
    cssmin: {
      dist: {
        src: ['app/assets/styles/*.css'],
        dest: 'public/css/style.css'
      }
    },
    lint: {
      files: ['grunt.js', 'app.coffee', 'src/scripts/*.coffee']
    },
    min: {
      dist: {
        src: ['app/assets/scripts/*.js'],
        dest: 'public/js/script.js'
      }
    },
    reload: {
      port: 3000,
      proxy: {
        host: 'localhost'
      }
    },
    smushit:{
      imgs: {
          src: 'app/assets/images',
          dest: 'public/img'
      }
    },
    watch: {
      process: {
        files: ['*.coffee', 'config/**/*.coffee', 'app/**/*.coffee', 'app/assets/styles/**/*.sass'],
        tasks: 'compass coffee min cssmin'
      }//,
      // reload: {
      //   files: ['public/css/style.css'],
      //   tasks: 'reload',
      //   options: {
      //     debounceDelay: 250
      //   }
      // }
    }
  });

  // Default task.
  grunt.registerTask('pub', 'clean cssmin smushit');

};
