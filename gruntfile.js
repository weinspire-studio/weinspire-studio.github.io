// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    conf: grunt.file.readJSON("config.json"),
    // cleans up the build directory (dist)
    clean: {
      build: "dist",
    },
    //Detects errors and problems in js files.
    jshint: {
      options: {
        reporter: require("jshint-stylish"),
        ignores: [
          "./js/sub_modules/svg4everybody.js",
          "./js/sub_modules/classList.js",
        ],
      },
      build: ["gruntfile.js", "package.json", "./js/sub_modules/*.js"],
    },
    // Looks for html errors.
    htmlhint: {
      html1: {
        options: {
          "tag-pair": true,
          "attr-lowercase": ["viewBox", "gradientUnits"],
          "doctype-first": true,
          "id-unique": true,
          "attr-value-double-quotes": false,
          "spec-char-escape": false,
        },
        src: ["./html/index-dev.html"],
      },
      html2: {
        options: {
          "tag-pair": true,
          "attr-lowercase": ["viewBox", "gradientUnits"],
          "attr-value-double-quotes": true,
          "doctype-first": true,
          "spec-char-escape": true,
          "id-unique": true,
        },
        src: ["./es/index.html"],
      },
    },
    // compiles sass to css
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "sass",
            src: ["*.scss"],
            dest: "css",
            ext: ".css",
          },
        ],
      },
    },
    // critical css inlined. The rest is wrapped in async js function, with noscript (for js disabled browsers).
    // extract does not work, have to do it manually. (see critical-grunt file)
    critical: {
      test: {
        options: {
          base: "./",
          css: ["css/main.css"],
          width: 450,
          height: 900,
        },
        src: "html/index-dev.html",
        dest: "index.html",
        // dest: "css/critical-grunt.css",
      },
    },
    // Uglify only works with ES5. Same config to cssmin
    cssmin: {
      options: {
        banner:
          '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
      },
      build: {
        files: {
          "./dist/css/main.min.css": "<%= conf.main_css %>",
        },
      },
    },
    autoprefixer: {
      options: {
        browserslist: ["defaults", "ie 10", "chrome 35"],
      },
      single_file: {
        src: "<%= conf.main_css %>",
        dest: "<%= conf.main_css %>",
      },
    },
    // js bundler
    browserify: {
      mobInit: {
        src: ["./js/sub_modules/mobile-init.js"],
        dest: "./dist/js/empty/empty-mi.js",
        options: {
          exclude: ["./js/sub_modules/jquery.js"],
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
              },
            ],
          ],
          plugin: [
            [
              "factor-bundle",
              {
                outputs: ["./dist/js/mobile-init.js"],
              },
            ],
          ],
        },
      },
      mobDefer: {
        src: ["./js/sub_modules/mobile-defer.js", "./js/sub_modules/swiper.js"],
        dest: "./dist/js/mobile-defer.js",
        options: {
          // ignore: ["lodash/debounce"],
          require: ["./js/sub_modules/swiper.js"],
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
                global: true,
              },
            ],
            ["browserify-css", { global: true }],
          ],
        },
      },
      deskInit: {
        src: ["./js/sub_modules/desktop-init.js"],
        dest: "./dist/js/empty/empty-di.js",
        options: {
          exclude: [
            "lodash/debounce",
            "./js/sub_modules/http.js",
            "./js/sub_modules/animation.js",
          ],
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
              },
            ],
          ],
          plugin: [
            [
              "factor-bundle",
              {
                outputs: ["./dist/js/desktop-init.js"],
              },
            ],
          ],
        },
      },
      deskDefer: {
        src: ["./js/sub_modules/desktop-defer.js"],
        dest: "./dist/js/empty/empty-dd.js",
        options: {
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
              },
            ],
          ],
          plugin: [
            [
              "factor-bundle",
              {
                outputs: ["./dist/js/desktop-defer.js"],
              },
            ],
          ],
        },
      },
      commonDefer: {
        src: [
          "./js/sub_modules/common-defer.js",
          "./js/sub_modules/contact.js",
        ],
        dest: "./dist/js/common-defer.js",
        options: {
          require: ["./js/sub_modules/contact.js"],
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
                global: true,
              },
            ],
          ],
        },
      },
      main: {
        src: [
          "./js/main.js",
          "./js/sub_modules/desktop-init.js",
          "./js/sub_modules/desktop-defer.js",
          "./js/sub_modules/mobile-init.js",
          "./js/sub_modules/mobile-defer.js",
          "./js/sub_modules/typewriter.js",
          "./js/sub_modules/preloader.js",
          "./js/sub_modules/animation.js",
          "./js/sub_modules/jquery.js",
          "./js/sub_modules/svg4everybody.js",
          "./js/sub_modules/classlist.js",
          "./js/sub_modules/http.js",
          "loadash/debounce",
          // "core-js/modules/es.promise",
          // "core-js/modules/es.array.iterator",
          // "intersection-observer",
        ],
        dest: "./dist/js/common.js",
        options: {
          ignore: [
            "./js/sub_modules/desktop-defer.js",
            "./js/sub_modules/desktop-init.js",
            "./js/sub_modules/mobile-init.js",
            "./js/sub_modules/mobile-defer.js",
            "./js/sub_modules/common-defer.js",
            "./js/sub_modules/swiper.js",
          ],
          require: [
            // "core-js/modules/es.promise",
            // "core-js/modules/es.array.iterator",
          ],
          // external: ["intersection-observer"],
          transform: [
            [
              "babelify",
              {
                presets: ["@babel/preset-env"],
              },
            ],
          ],
          plugin: [
            [
              "factor-bundle",
              {
                outputs: ["./dist/js/main.js"],
              },
            ],
          ],
        },
      },
    },
    // js minifier
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: "./dist/js/sourceMap.map",
        output: {
          comments: "some",
        },
      },
      // all: {
      //   src: "./js/common.js",
      //   dest: "./dist/js/all.min.js",
      //   // src: "./js/*-es5.js",
      // },
      mobInit: {
        src: "./dist/js/mobile-init.js",
        dest: "./dist/js/min/mobile-init.min.js",
      },
      mobDefer: {
        src: "./dist/js/mobile-defer.js",
        dest: "./dist/js/min/mobile-defer.min.js",
      },
      deskInit: {
        src: "./dist/js/desktop-init.js",
        dest: "./dist/js/min/desktop-init.min.js",
      },
      deskDefer: {
        src: "./dist/js/desktop-defer.js",
        dest: "./dist/js/min/desktop-defer.min.js",
      },
      commonDefer: {
        src: "./dist/js/common-defer.js",
        dest: "./dist/js/min/common-defer.min.js",
      },
      common: {
        src: "./dist/js/common.js",
        dest: "./dist/js/min/common.min.js",
      },
      main: {
        src: "./dist/js/main.js",
        dest: "./dist/js/min/main.min.js",
      },
    },
    // svg optimizer and minifier
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeUselessStrokeAndFill: false,
          },
          {
            removeTitle: false,
          },
          {
            removeDesc: false,
          },
          {
            cleanupIDs: false,
          },
          {
            removeAttrs: {
              attrs: ["xmlns"],
            },
          },
          // {
          //   mergePaths: false,
          // },
        ],
      },
      dist: {
        files: {
          "./assets/optimized_sprite/brand-mobile.svg": "./assets/brand-mobile.svg", // prettier-ignore
          "./assets/optimized_sprite/brand-desktop.svg": "./assets/brand-desktop.svg", // prettier-ignore
          "./assets/optimized_sprite/facebook.svg": "./assets/facebook.svg",
          "./assets/optimized_sprite/whatsapp.svg": "./assets/whatsapp.svg",
          "./assets/optimized_sprite/linkedin.svg": "./assets/linkedin.svg",
          "./assets/optimized_sprite/behance.svg": "./assets/behance.svg",
          "./assets/optimized_sprite/location.svg": "./assets/location.svg",
          "./assets/optimized_sprite/email.svg": "./assets/email.svg",
          "./assets/optimized_sprite/instagram.svg": "./assets/instagram.svg",
          "./assets/optimized_sprite/email-circle.svg": "./assets/email-circle.svg", // prettier-ignore
          "./assets/optimized_sprite/location-circle.svg": "./assets/location-circle.svg", // prettier-ignore
          "./assets/optimized_sprite/whatsapp-transparent.svg": "./assets/whatsapp-transparent.svg", // prettier-ignore
          "./assets/optimized_sprite/footer-location.svg": "./assets/footer-location.svg", // prettier-ignore
          "./assets/optimized_sprite/arrow-up.svg": "./assets/arrow-up.svg",
          "./assets/optimized_sprite/arrow-left.svg": "./assets/arrow-left.svg",
          "./assets/optimized_sprite/arrow-right.svg": "./assets/arrow-right.svg", // prettier-ignore
          "./assets/optimized_sprite/cross.svg": "./assets/cross.svg",
          // "./assets/optimized/footer-bg.svg": "./assets/footer-bg.svg",
          // "./assets/optimized/contact-bg.svg": "./assets/contact-bg.svg",
          // "./assets/optimized/svg-bg-left.svg": "./assets/svg-bg-left.svg",
          // "./assets/optimized/svg-separator.svg": "./assets/svg-separator.svg", // prettier-ignore
          // "./assets/optimized/svg-background.svg": "./assets/svg-background.svg", // prettier-ignore
          // "./assets/optimized/design.svg": "./assets/design.svg", // uncomment and manually optimize svgs for ajax
          // "./assets/optimized/software.svg": "./assets/software.svg", // uncomment mergePaths, comment removeAttrs
          // "./assets/optimized/marketing.svg": "./assets/marketing.svg",
        },
      },
    },
    // svg sprites builder
    svg_sprite: {
      default: {
        expand: true,
        cwd: "./assets/optimized_sprite/",
        src: ["*.svg"],
        dest: "./assets/",
        options: {
          mode: {
            symbol: {
              dest: "sprites",
              sprite: "svg-sprite.svg",
            },
          },
          svg: {
            xmlDeclaration: false,
            namespaceClassnames: false,
            namespaceIDs: false,
          },
        },
      },
    },
    responsive_images: {
      default: {
        options: {
          sizes: [
            {
              name: "small",
              width: 400,
            },
            {
              name: "medium",
              width: 800,
            },
            {
              name: "large",
              width: 1080,
            },
          ],
        },
        files: {
          "./assets/hero-img.png": "./assets/hero-img.png",
        },
      },
    },
    // Compile everything into one task with Watch Plugin
    watch: {
      scss: {
        files: "./sass/**/*.scss",
        tasks: ["sass"],
      },
      css: {
        files: "<%= conf.main_css %>",
        tasks: ["autoprefixer", "cssmin", "critical"],
      },
      js: {
        files: [
          "./js/main.js",
          "./js/sub_modules/*.js",
          "./gruntfile.js",
          "./dist/js/*.js",
        ],
        tasks: [
          "jshint",
          // "browserify:mobInit",
          // "browserify:mobDefer",
          // "browserify:deskInit",
          // "browserify:deskDefer",
          // "browserify:commonDefer",
          // "browserify:main",
          "uglify",
        ],
      },
      html: {
        files: "./html/index-dev.html",
        tasks: ["htmlhint", "critical"],
      },
      html2: {
        files: "./es/index.html",
        tasks: ["htmlhint"],
      },
    },
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

  grunt.loadNpmTasks("grunt-svg-sprite");
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-responsive-images");

  // Register Grunt tasks
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("svg-tasks", ["svgmin", "svg_sprite"]);
  grunt.registerTask("responsive-images", ["responsive_images"]);

  // prettier-ignore
  grunt.registerTask("build", ["clean", "sass", "autoprefixer", "cssmin", "critical", "htmlhint", "jshint", "browserify", "uglify"]);
};
// commonDefer: 30, deskInit: 11, deskDefer:10, mobInit: 13, mobDefer: 12, debounce: 16, jquery: 5// http: 3, animation: 2.
