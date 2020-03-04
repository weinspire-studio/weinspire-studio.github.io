// Load Grunt
module.exports = function(grunt) {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    conf: grunt.file.readJSON("config.json"),
    // cleans up the build directory (dist)
    clean: {
      build: "dist"
    },
    //Detects errors and problems in js files.
    jshint: {
      options: {
        reporter: require("jshint-stylish")
      },
      build: ["gruntfile.js", "./scripts/main.js"]
    },
    // Loos for html errors.
    htmlhint: {
      build: {
        options: {
          "tag-pair": true,
          "attr-lowercase": ["viewBox", "gradientUnits"],
          "attr-value-double-quotes": true,
          "doctype-first": true,
          "spec-char-escape": true,
          "id-unique": true,
          "head-script-disabled": true,
          "style-disabled": true
        },
        src: ["index-non_critical.html"]
      }
    },
    // compiles to sass
    sass: {
      dist: {
        files: {
          "<%= conf.main_css %>": "<%= conf.main_scss %>"
        }
      }
    },
    // critical css inlined. The rest is wrapped in async js function, with noscript (for js disabled browsers).
    critical: {
      test: {
        options: {
          base: "./",
          css: ["dist/css/main.min.css"]
          //   dimensions: [
          //     {
          //       height: 600,
          //       width: 350
          //     },
          //     {
          //       height: 900,
          //       width: 1200
          //     }
          //   ]
          //   // height: 900,
          //   // width: 1200
        },
        src: "./html/index-non_critical.html",
        dest: "./index.html",
        uncritical: "./css/main-uncritical.css",
        extract: true
      }
    },
    // Uglify only works with ES5. Same config to cssmin
    cssmin: {
      options: {
        banner:
          '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          "./dist/css/main.min.css": "<%= conf.main_css %>"
        }
      }
    },
    autoprefixer: {
      options: {
        browserslist: ["defaults", "ie 8", "ie 9", "ie 10"]
      },
      single_file: {
        src: "<%= conf.main_css %>",
        dest: "<%= conf.main_css %>"
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"]
      },
      files: {
        expand: true,
        src: ["./scripts/main.js"],
        dest: "",
        ext: "-es5.js"
      }
    },
    uglify: {
      all_src: {
        options: {
          sourceMap: true,
          sourceMapName: "./dist/js/sourceMap.map"
        },
        src: "./scripts/*-es5.js",
        dest: "./dist/js/all.min.js"
      }
    },
    // Compile everything into one task with Watch Plugin
    watch: {
      css: {
        files: "<%= conf.main_scss %>",
        tasks: ["sass", "autoprefixer", "cssmin"]
      },
      js: {
        files: "./scripts/main.js",
        tasks: ["jshint", "babel", "uglify"]
      },
      html: {
        files: "./html/index-non_critical.html",
        tasks: ["htmlhint"]
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-htmlhint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-critical");

  // Register Grunt tasks
  // grunt.registerTask("default", ["watch"]);
  grunt.registerTask("default", ["watch"]);
  // grunt.registerTask("default", ['sass:dist', 'babel:dist']);
  // prettier-ignore
  grunt.registerTask("build", ["clean", "sass", "autoprefixer", "cssmin", "critical", "htmlhint", "jshint", "babel", "uglify"]);
};
