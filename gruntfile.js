// Load Grunt
module.exports = function(grunt) {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  // require("load-grunt-tasks")(grunt);

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
      build: ["gruntfile.js", "./scripts/swiper.js"]
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
            // "<%= conf.main_css %>": "<%= conf.main_scss %>"
            // "./css/main.css": "./sass/main.scss"
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
    // babel: {
    //   options: {
    //     sourceMap: true,
    //     presets: ["@babel/preset-env"]
    //   },
    //   files: {
    //     expand: true,
    //     src: ["./scripts/main.js"],
    //     dest: "",
    //     ext: "-es5.js"
    //   }
    // },
    browserify: {
      development: {
        src: [
          "./scripts/main.js",
          "./scripts/swiper.js"
          // "./custom_modules/swiper/js/swiper.esm.js"
        ],
        dest: "./scripts/common.js",
        options: {
          // browserifyOptions: { debug: true },
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
                global: true,
                // ignore: [/\/node_modules\/(?!swiper|dom7\/)/]
                only: [
                  // /^(?:.*\/node_modules\/(?:swiper|dom7)\/|(?!.*\/node_modules\/)).*$/,
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
          // sourceMap: true,
          // sourceMapName: "./dist/js/sourceMap.map"
        },
        src: "./scripts/common.js",
        dest: "./dist/js/all.min.js"
        // src: "./scripts/*-es5.js",
      }
    },
    compress: {
      main: {
        options: {
          mode: "gzip"
        },
        // Each of the files in the src/ folder will be output to
        // the dist/ folder each with the extension .gz.js
        files: [
          {
            expand: true,
            src: ["./dist/js/*.js"],
            dest: "./",
            ext: ".min.gz.js"
          }
        ]
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
        files: ["./scripts/main.js", "./scripts/swiper.js", "./gruntfile.js"],
        tasks: ["jshint", "browserify", "uglify"]
      },
      html: {
        files: "./html/index-dev.html",
        tasks: ["htmlhint", "critical"]
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
  // grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-critical");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-compress");

  // Register Grunt tasks
  grunt.registerTask("default", ["watch"]);
  // grunt.registerTask("default", ['sass:dist', 'babel:dist']);
  // prettier-ignore
  grunt.registerTask("build", ["clean", "sass", "autoprefixer", "cssmin", "critical", "htmlhint", "jshint", "browserify", "uglify", "compress"]);
};
