// jshint esversion: 6

import * as preloaderModule from "./sub_modules/preloader";
import * as typewriterModule from "./sub_modules/typewriter";
import * as animationsModule from "./sub_modules/animation";
import * as httpModule from "./sub_modules/http";
import * as jQueryModule from "./sub_modules/jquery";
import svg4everybody from "./sub_modules/svg4everybody";
import debounce from "lodash/debounce";
import "./sub_modules/classlist";

//VARIABLES
const mobileScreenMQ = window.matchMedia("(max-width: 800px)");
const isSafari =
  navigator.vendor &&
  navigator.vendor.indexOf("Apple") > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf("CriOS") === -1 &&
  navigator.userAgent.indexOf("FxiOS") === -1;
const isIE =
  navigator.userAgent.indexOf("MSIE") !== -1 ||
  navigator.appVersion.indexOf("Trident/") > -1;
let supportsPassive = false;
let isListening = false;
let hasCommonDefer = false;
let toDesk = false;
let toMob = false;
let isAppended_MobileInit = false;
let isAppended_MobileDefer = false;
let isAppended_DesktopInit = false;
let isAppended_DesktopDefer = false;
let isMobile;
let mobileInitResult;
let desktopInitResult;
let mobileDeferResult;
let env;
if (document.documentElement.lang === "en") env = ".";
else env = "..";

// forEach polyfill IE11.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// passive support IE11
try {
  const options = {
    get passive() {
      supportsPassive = true;
      return false;
    },
  };
  window.addEventListener("test", null, options);
  window.removeEventListener("test", null, options);
} catch (err) {
  supportsPassive = false;
}

//FUNCTIONS INVOCATIONS
init();
initOnWidthChange();
svg4everybody({ attributeName: "data-href", polyfill: true });
animationsModule.prepareRequests();
jQueryModule.smoothScroll();
window.addEventListener("load", initLanding);

//FUNCTIONS DEFINITIONS
//on pageload, executes the following code, depending on screen width.
function init() {
  if (mobileScreenMQ.matches) {
    deployMobile();
    isMobile = true;
  } else {
    deployDesktop();
    isMobile = false;
  }
}

// hides preloader, animate assets and inits typeWriter.
function initLanding() {
  preloaderModule.hidePreloader();
  typewriterModule.initWriter(isMobile, supportsPassive);
}

// adds listener that executes when screen width changes (passing by 801px).
function initOnWidthChange() {
  if (!isListening) {
    try {
      // Chrome & Firefox
      mobileScreenMQ.addEventListener("change", (e) => {
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
        mobileScreenMQ.addListener(() => {
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
  appendScript("desktop-init", importDesktopInit, isAppended_DesktopInit);
  isAppended_DesktopInit = true;
}

function importMobileInit(isAppended_MobileInit) {
  import("./sub_modules/mobile-init").then((mobileInit) => {
    mobileInitResult = mobileInit.mobileInitCode(
      supportsPassive,
      isAppended_MobileInit,
      debounce
    );
    if (toMob) {
      toMobile();
      deferMobile();
      window.removeEventListener(
        "scroll",
        desktopInitResult,
        supportsPassive ? { passive: true } : false
      );
    } else {
      window.addEventListener("load", () => {
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
  import("./sub_modules/desktop-init").then((desktopInit) => {
    desktopInitResult = desktopInit.desktopInitCode(supportsPassive, debounce);
    if (toDesk) {
      toDesktop(desktopInit.prepareForDesktop);
      deferDesktop();
      window.removeEventListener(
        "scroll",
        mobileInitResult,
        supportsPassive ? { passive: true } : false
      );
    } else {
      window.addEventListener("load", () => {
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
  appendScript("mobile-defer", importMobileDefer, isAppended_MobileDefer);
  isAppended_MobileDefer = true;
}

function deferDesktop() {
  appendScript("desktop-defer", importDesktopDefer, isAppended_DesktopDefer);
  isAppended_DesktopDefer = true;
}

function deferCommon() {
  appendScript("common-defer", importCommonDefer, false);
}

function importMobileDefer() {
  import("./sub_modules/mobile-defer").then((mobileDefer) => {
    mobileDeferResult = mobileDefer.mobileDeferCode(
      isSafari,
      supportsPassive,
      debounce
    );
  });
}

function importDesktopDefer() {
  import("./sub_modules/desktop-defer").then((desktopDefer) => {
    desktopDefer.desktopDeferCode(
      isSafari,
      jQueryModule.animateImages,
      httpModule.loadHDImages,
      animationsModule.slideAnim
    );
  });
}

function importCommonDefer() {
  import("./sub_modules/common-defer").then((commonDefer) => {
    commonDefer.commonDeferInit(isSafari, isIE);
  });
}

// WIDTH CHANGE
function toMobile() {
  typewriterModule.reviewWidth(true);
  import("./sub_modules/desktop-defer").then((desktopDefer) => {
    desktopDefer.prepareForMobile(isSafari);
  });
}

function toDesktop(callback) {
  typewriterModule.reviewWidth(false);
  import("./sub_modules/mobile-init").then((mobileInit) => {
    callback(mobileInit.toggleNavClasses);
  });
  import("./sub_modules/mobile-defer").then((mobileDefer) => {
    mobileDefer.slideRightArrows(supportsPassive);
  });
  if (mobileDeferResult)
    if (mobileDeferResult.params && mobileDeferResult.params.init === true)
      mobileDeferResult.destroy();
}

// HELPER FUNCTIONS
function appendScript(moduleName, callback, isAppended) {
  if (!isAppended) {
    let script = document.createElement("script");
    script.defer = true;
    script.onload = callback;
    script.onerror = errorHandler;
    script.src = `${env}/dist/js/min/${moduleName}.min.js`;
    if (script.readyState == "complete") {
      script.onreadystatechange = function () {
        callback();
      };
    }
    document.getElementsByTagName("body")[0].appendChild(script);
  } else callback();
}

function errorHandler() {
  console.log("Dynamic import failed! Please check your internet connection.");
}

// debounce
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
