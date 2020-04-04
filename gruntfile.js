// Load Grunt
module.exports = function(grunt) {
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
      build: ["gruntfile.js", "./js/sub_modules/*.js"]
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
        src: ["index-dev.html"]
      }
    },
    // compiles to sass
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "sass",
            src: ["*.scss"],
            dest: "css",
            ext: ".css"
          }
        ]
      }
    },
    // critical css inlined. The rest is wrapped in async js function, with noscript (for js disabled browsers).
    critical: {
      test: {
        options: {
          base: "./",
          css: ["./dist/css/main.min.css"]
        },
        src: "./html/index-dev.html",
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
    browserify: {
      development: {
        src: [
          "./js/main.js",
          "./js/sub_modules/swiper.js"
          // "./custom_modules/swiper/js/swiper.esm.js"
        ],
        dest: "./js/common.js",
        options: {
          // browserifyOptions: { debug: true },
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
                global: true,
                only: [
                  /^(?:.*\/node_custom_modules\/(?:swiper)\/|(?!.*\/node_custom_modules\/)).*$/
                ]
              }
            ],
            ["browserify-css", { global: true }]
          ]
          // watch: true,
          // keepAlive: true
        }
      }
    },
    uglify: {
      all_src: {
        options: {
          sourceMap: true,
          sourceMapName: "./dist/js/sourceMap.map"
        },
        src: "./js/common.js",
        dest: "./dist/js/all.min.js"
        // src: "./js/*-es5.js",
      }
    },
    // Compile everything into one task with Watch Plugin
    watch: {
      scss: {
        files: "./sass/**/*.scss",
        tasks: ["sass"]
      },
      css: {
        files: "<%= conf.main_css %>",
        tasks: ["autoprefixer", "cssmin", "critical"]
      },
      js: {
        files: ["./js/main.js", "./js/sub_modules/*.js", "./gruntfile.js"],
        tasks: ["jshint", "browserify", "uglify"]
      },
      html: {
        files: "./html/index-dev.html",
        tasks: ["htmlhint", "critical"]
      }
    }
  });

  // Grunt plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-htmlhint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-critical");
  grunt.loadNpmTasks("grunt-browserify");

  // Register Grunt tasks
  grunt.registerTask("default", ["watch"]);
  // prettier-ignore
  grunt.registerTask("build", ["clean", "sass", "autoprefixer", "cssmin", "critical", "htmlhint", "jshint", "browserify", "uglify"]);
};
