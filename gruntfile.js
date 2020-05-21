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
      build: ["gruntfile.js", "./js/sub_modules/*.js"],
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
          "style-disabled": true,
        },
        src: ["index-dev.html"],
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
        browserslist: ["defaults", "ie 8", "ie 9", "ie 10"],
      },
      single_file: {
        src: "<%= conf.main_css %>",
        dest: "<%= conf.main_css %>",
      },
    },
    // js bundler
    browserify: {
      development: {
        src: ["./js/main.js", "./js/sub_modules/swiper.js"],
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
                  /^(?:.*\/node_custom_modules\/(?:swiper)\/|(?!.*\/node_custom_modules\/)).*$/,
                ],
              },
            ],
            ["browserify-css", { global: true }],
          ],
          // watch: true,
          // keepAlive: true
        },
      },
    },
    // js minifier
    uglify: {
      all_src: {
        options: {
          sourceMap: true,
          sourceMapName: "./dist/js/sourceMap.map",
        },
        src: "./js/common.js",
        dest: "./dist/js/all.min.js",
        // src: "./js/*-es5.js",
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
              // attrs: ["xmlns"],
            },
          },
        ],
      },
      dist: {
        files: {
          "./assets/optimized/brand-mobile.svg": "./assets/brand-mobile.svg",
          "./assets/optimized/brand-desktop.svg": "./assets/brand-desktop.svg",
          "./assets/optimized/email.svg": "./assets/email.svg",
          "./assets/optimized/email-circle.svg": "./assets/email-circle.svg",
          "./assets/optimized/whatsapp.svg": "./assets/whatsapp.svg",
          "./assets/optimized/whatsapp-circle.svg": "./assets/whatsapp-circle.svg", // prettier-ignore
          "./assets/optimized/facebook.svg": "./assets/facebook.svg",
          "./assets/optimized/behance.svg": "./assets/behance.svg",
          "./assets/optimized/linkedin.svg": "./assets/linkedin.svg",
          "./assets/optimized/arrow-up.svg": "./assets/arrow-up.svg",
          "./assets/optimized/location.svg": "./assets/location.svg",
          // "./assets/optimized_ajax/svg-background.svg": "./assets/svg-background.svg" // prettier-ignore
          // "./assets/optimized_ajax/design.svg": "./assets/design.svg", // uncomment (along with removeAttrs) and manually optimize svgs for ajax
          // "./assets/optimized_ajax/software.svg": "./assets/software.svg",
        },
      },
    },
    // svg sprites builder
    svg_sprite: {
      default: {
        expand: true,
        cwd: "./assets/optimized/",
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
        files: ["./js/main.js", "./js/sub_modules/*.js", "./gruntfile.js"],
        tasks: ["jshint", "browserify", "uglify"],
      },
      html: {
        files: "./html/index-dev.html",
        tasks: ["htmlhint", "critical"],
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

  // Register Grunt tasks
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("svg-tasks", ["svgmin", "svg_sprite:default"]);

  // prettier-ignore
  grunt.registerTask("build", ["clean", "sass", "autoprefixer", "cssmin", "critical", "htmlhint", "jshint", "browserify", "uglify"]);
};
