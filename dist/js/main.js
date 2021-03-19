require = (function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        "use strict";

        var preloaderModule = _interopRequireWildcard(
          require("./sub_modules/preloader")
        );

        var typewriterModule = _interopRequireWildcard(
          require("./sub_modules/typewriter")
        );

        var animationsModule = _interopRequireWildcard(
          require("./sub_modules/animation")
        );

        var httpModule = _interopRequireWildcard(require("./sub_modules/http"));

        var jQueryModule = _interopRequireWildcard(
          require("./sub_modules/jquery")
        );

        var _svg4everybody = _interopRequireDefault(
          require("./sub_modules/svg4everybody")
        );

        var _debounce = _interopRequireDefault(require("lodash/debounce"));

        require("./sub_modules/classlist");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        function _getRequireWildcardCache() {
          if (typeof WeakMap !== "function") return null;
          var cache = new WeakMap();
          _getRequireWildcardCache = function _getRequireWildcardCache() {
            return cache;
          };
          return cache;
        }

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          }
          if (
            obj === null ||
            (_typeof(obj) !== "object" && typeof obj !== "function")
          ) {
            return { default: obj };
          }
          var cache = _getRequireWildcardCache();
          if (cache && cache.has(obj)) {
            return cache.get(obj);
          }
          var newObj = {};
          var hasPropertyDescriptor =
            Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = hasPropertyDescriptor
                ? Object.getOwnPropertyDescriptor(obj, key)
                : null;
              if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
          newObj["default"] = obj;
          if (cache) {
            cache.set(obj, newObj);
          }
          return newObj;
        }

        //VARIABLES
        var mobileScreenMQ = window.matchMedia("(max-width: 800px)");
        var isSafari =
          navigator.vendor &&
          navigator.vendor.indexOf("Apple") > -1 &&
          navigator.userAgent &&
          navigator.userAgent.indexOf("CriOS") === -1 &&
          navigator.userAgent.indexOf("FxiOS") === -1;
        var isIE =
          navigator.userAgent.indexOf("MSIE") !== -1 ||
          navigator.appVersion.indexOf("Trident/") > -1;
        var supportsPassive = false;
        var isListening = false;
        var hasCommonDefer = false;
        var toDesk = false;
        var toMob = false;
        var isAppended_MobileInit = false;
        var isAppended_MobileDefer = false;
        var isAppended_DesktopInit = false;
        var isAppended_DesktopDefer = false;
        var isMobile;
        var mobileInitResult;
        var desktopInitResult;
        var mobileDeferResult;
        var env;
        if (document.documentElement.lang === "en") env = ".";
        else env = ".."; // forEach polyfill IE11.

        if (window.NodeList && !NodeList.prototype.forEach) {
          NodeList.prototype.forEach = Array.prototype.forEach;
        } // passive support IE11

        try {
          var options = {
            get passive() {
              supportsPassive = true;
              return false;
            },
          };
          window.addEventListener("test", null, options);
          window.removeEventListener("test", null, options);
        } catch (err) {
          supportsPassive = false;
        } //FUNCTIONS INVOCATIONS

        init();
        initOnWidthChange();
        (0, _svg4everybody["default"])({
          attributeName: "data-href",
          polyfill: true,
        });
        animationsModule.prepareRequests();
        jQueryModule.smoothScroll();
        window.addEventListener("load", initLanding); //FUNCTIONS DEFINITIONS
        //on pageload, executes the following code, depending on screen width.

        function init() {
          if (mobileScreenMQ.matches) {
            deployMobile();
            isMobile = true;
          } else {
            deployDesktop();
            isMobile = false;
          }
        } // hides preloader, animate assets and inits typeWriter.

        function initLanding() {
          preloaderModule.hidePreloader();
          typewriterModule.initWriter(isMobile, supportsPassive);
        } // adds listener that executes when screen width changes (passing by 801px).

        function initOnWidthChange() {
          if (!isListening) {
            try {
              // Chrome & Firefox
              mobileScreenMQ.addEventListener("change", function (e) {
                if (e.matches) {
                  isMobile = true;
                  toMob = true;
                  deployMobile();
                } else {
                  isMobile = false;
                  toDesk = true;
                  deployDesktop();
                }
              });
            } catch (e1) {
              try {
                // Safari
                mobileScreenMQ.addListener(function () {
                  if (mobileScreenMQ.matches) {
                    isMobile = true;
                    toMob = true;
                    deployMobile();
                  } else {
                    isMobile = false;
                    toDesk = true;
                    deployDesktop();
                  }
                });
              } catch (e2) {
                console.error(e2);
              }
            }

            isListening = true;
          }
        }

        function deployMobile() {
          appendScript(
            "mobile-init",
            importMobileInit.bind(null, isAppended_MobileInit),
            isAppended_MobileInit
          );
          isAppended_MobileInit = true;
        }

        function deployDesktop() {
          appendScript(
            "desktop-init",
            importDesktopInit,
            isAppended_DesktopInit
          );
          isAppended_DesktopInit = true;
        }

        function importMobileInit(isAppended_MobileInit) {
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/mobile-init")
              );
            })
            .then(function (mobileInit) {
              mobileInitResult = mobileInit.mobileInitCode(
                supportsPassive,
                isAppended_MobileInit,
                _debounce["default"]
              );

              if (toMob) {
                toMobile();
                deferMobile();
                window.removeEventListener(
                  "scroll",
                  desktopInitResult,
                  supportsPassive
                    ? {
                        passive: true,
                      }
                    : false
                );
              } else {
                window.addEventListener("load", function () {
                  deferMobile();

                  if (!hasCommonDefer) {
                    deferCommon();
                    hasCommonDefer = true;
                  }
                });
              }
            });
        }

        function importDesktopInit() {
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/desktop-init")
              );
            })
            .then(function (desktopInit) {
              desktopInitResult = desktopInit.desktopInitCode(
                supportsPassive,
                _debounce["default"]
              );

              if (toDesk) {
                toDesktop(desktopInit.prepareForDesktop);
                deferDesktop();
                window.removeEventListener(
                  "scroll",
                  mobileInitResult,
                  supportsPassive
                    ? {
                        passive: true,
                      }
                    : false
                );
              } else {
                window.addEventListener("load", function () {
                  deferDesktop();

                  if (!hasCommonDefer) {
                    deferCommon();
                    hasCommonDefer = true;
                  }
                });
              }
            });
        }

        function deferMobile() {
          appendScript(
            "mobile-defer",
            importMobileDefer,
            isAppended_MobileDefer
          );
          isAppended_MobileDefer = true;
        }

        function deferDesktop() {
          appendScript(
            "desktop-defer",
            importDesktopDefer,
            isAppended_DesktopDefer
          );
          isAppended_DesktopDefer = true;
        }

        function deferCommon() {
          appendScript("common-defer", importCommonDefer, false);
        }

        function importMobileDefer() {
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/mobile-defer")
              );
            })
            .then(function (mobileDefer) {
              mobileDeferResult = mobileDefer.mobileDeferCode(
                isSafari,
                supportsPassive,
                _debounce["default"]
              );
            });
        }

        function importDesktopDefer() {
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/desktop-defer")
              );
            })
            .then(function (desktopDefer) {
              desktopDefer.desktopDeferCode(
                isSafari,
                jQueryModule.animateImages,
                httpModule.loadHDImages,
                animationsModule.slideAnim
              );
            });
        }

        function importCommonDefer() {
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/common-defer")
              );
            })
            .then(function (commonDefer) {
              commonDefer.commonDeferInit(isSafari, isIE);
            });
        } // WIDTH CHANGE

        function toMobile() {
          typewriterModule.reviewWidth(true);
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/desktop-defer")
              );
            })
            .then(function (desktopDefer) {
              desktopDefer.prepareForMobile(isSafari);
            });
        }

        function toDesktop(callback) {
          typewriterModule.reviewWidth(false);
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/mobile-init")
              );
            })
            .then(function (mobileInit) {
              callback(mobileInit.toggleNavClasses);
            });
          Promise.resolve()
            .then(function () {
              return _interopRequireWildcard(
                require("./sub_modules/mobile-defer")
              );
            })
            .then(function (mobileDefer) {
              mobileDefer.slideRightArrows(supportsPassive);
            });
          if (mobileDeferResult)
            if (
              mobileDeferResult.params &&
              mobileDeferResult.params.init === true
            )
              mobileDeferResult.destroy();
        } // HELPER FUNCTIONS

        function appendScript(moduleName, callback, isAppended) {
          if (!isAppended) {
            var script = document.createElement("script");
            script.defer = true;
            script.onload = callback;
            script.onerror = errorHandler;
            script.src = ""
              .concat(env, "/dist/js/min/")
              .concat(moduleName, ".min.js");

            if (script.readyState == "complete") {
              script.onreadystatechange = function () {
                callback();
              };
            }

            document.getElementsByTagName("body")[0].appendChild(script);
          } else callback();
        }

        function errorHandler() {
          console.log(
            "Dynamic import failed! Please check your internet connection."
          );
        } // debounce
        // export { navBar };
        // TODO:
        // shadows
        // Logos and svg background (bottom on mobile)
        // when navbar mobile opens, click everywhere to close it.
        // see navbar classes on burger click (specially on iphone)
        // social network in navbar?
        // navbar mobile open bug (z-index) DONE
        // bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes) DONE
        // burger ontap mobile! (see iphone, selection square)
        // accesibility svg titles - svg sprite
        // inline svg catched?! see css tricks tutorial
        // page loader!!
        // dynamic text! See youtube programming video!!
        // bugs: button focus blue (in chrome),
        // green inputs after submit DONE
        // in projects-design: if image stretches more than image witdh: repeat: round or size cover
        // lazy - loading!
        //download swipper only on mobile? conditional script
        // on select input from contact form BUG! iphone extra swipe
        // content link ?
        // mousedown touch start?
        //auto prefixer: prefix animations? maybe extend sass or something? Each keyframe with different prefix!
        // (caption onpageload in above-the-fold due to img from unsplash)
        // outline on burger div?
        // scroll anchoring onwidthchange init?
        // test foreach in win 11, and other compatibility issues. GRID! height 100%
        // inline css repeated
        // us, newsletter (and footer), bootloader, svgs in menu!
        // scroll on menu open? menu icons!
        // postcss? autoprefixer? html min? jquery as an external link? npm audit!
        // ::selection background-color
        // svg sprite loading twice?
        // body
        // overflow-x: hidden;
        // background-color: $background-light;
        // background-color: #bdc3cc52;
        // #c5d4d526
        // #dadfd145
        // #fdf0e95e
        // #e3dfcd4f
        // #cdf9ff24
        // #b1d8dd3b
        // #bdc3cc52
        // overflow-x: auto;
        // overflow-y: visible;
        // min-height: 100%;
        // -webkit-tap-highlight-color: rgba(0,0,0,0);
        // transform: scaleY(0.01) scaleX(0);
        // animation: unfoldIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        // @keyframes unfoldIn {
        // 	0% {
        // 		transform: scaleY(0.005) scaleX(0);
        // 	}
        // 	50% {
        // 		transform: scaleY(0.005) scaleX(1);
        // 	}
        // 	100% {
        // 		transform: scaleY(1) scaleX(1);
        // 	}
        // }
        // styleFlags, appendCTAMobile, appendCTADEsktop
        // mobile: mobile.js
        // desktop:
        //   "browser": {
        //     "desktopInit": "./js/sub_modules/desktop-init.js"
        // },
        //   "browserify": {
        //     "transform": [ "browserify-shim" ]
        //   },
        //   "browserify-shim": {
        //     "./js/libs.js": { "exports": "libs"}
        // },
        // "browserify": {
        //   "transform": [ "browserify-shim" ]
        // },
        // "browserify-shim": {
        //   "./js/libs.js": { "exports": "desktopInit", "depends": [ "./js/sub_modules/desktop-init.js" ] }
        // },
        // JS performance changes:
        // query selector, implicit bind, supports passive if.
        // HDimageload toPrmise!!
      },
      {
        "./sub_modules/animation": 2,
        "./sub_modules/classlist": 3,
        "./sub_modules/common-defer": 30,
        "./sub_modules/desktop-defer": 10,
        "./sub_modules/desktop-init": 11,
        "./sub_modules/http": 4,
        "./sub_modules/jquery": 5,
        "./sub_modules/mobile-defer": 12,
        "./sub_modules/mobile-init": 13,
        "./sub_modules/preloader": 7,
        "./sub_modules/svg4everybody": 8,
        "./sub_modules/typewriter": 9,
        "lodash/debounce": 16,
      },
    ],
  },
  {},
  [1]
);
