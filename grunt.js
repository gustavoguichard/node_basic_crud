/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
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
      folder: "public/css/"
    },
    coffee: {
      scripts: {
        src: ['src/scripts/*.coffee']
      },
      app: {
        src: ['app.coffee']
      }
    },
    copy: {
      target: {
        files: {
          'src/styles/': 'public/css/*'
        }
      }
    },
    cssmin: {
      dist: {
        src: ['src/styles/*.css'],
        dest: 'public/css/style.css'
      }
    },
    lint: {
      files: ['grunt.js', 'app.coffee', 'src/scripts/*.coffee']
    },
    // concat: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    min: {
      dist: {
        src: ['src/scripts/*.js'],
        dest: 'public/js/script.js'
      }
    },
    sass: {
      dist: {
        files: {
          'src/styles/style.css': 'src/styles/style.scss'
        }
      }
    },
    smushit:{
      //replace recursive
      imgs: {
          src:'public/img'
      }
    },
    watch: {
      files: ['app.coffee', 'src/scripts/*.coffee', 'src/styles/*.sass'],
      tasks: 'coffee min'
    }
  });

  // Default task.
  grunt.registerTask('pub', 'copy clean cssmin smushit');

};
