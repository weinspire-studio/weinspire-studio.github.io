// jshint esversion: 6

import * as preloaderModule from "./sub_modules/preloader";
import * as typewriterModule from "./sub_modules/typewriter";
import * as animationsModule from "./sub_modules/gsap-scrollmagic";
import * as jQueryModule from "./sub_modules/jquery";
import * as locationModule from "./sub_modules/location";
import { prepareForMobile, prepareForDesktop } from "./sub_modules/desktop";
import debounce from "lodash/debounce";
import svg4everybody from "./sub_modules/svg4everybody";
import "./sub_modules/classList";

import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";

//VARIABLES
const mobileScreenMQ = window.matchMedia("(max-width: 800px)");
const navBar = document.getElementById("section-navbar");
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
let toDesk = false;
let toMob = false;
let mobResult;
let deskResult;
let isMobile;

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
locationModule.getUserUbication();
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

// adds listener that executes when screen width changes (passing by 801px).
function initOnWidthChange() {
  if (!isListening) {
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
    isListening = true;
  }
}

function deployMobile() {
  import("./sub_modules/mobile-init").then((mobileInit) => {
    mobResult = mobileInit.mobileInitCode(isSafari, supportsPassive);
    if (toMob) {
      window.removeEventListener(
        "scroll",
        deskResult.debounce,
        supportsPassive ? { passive: true } : false
      );
    }
  });
  if (toMob) {
    toMobile();
    deferMobile(true);
  } else {
    window.addEventListener("load", () => {
      deferMobile();
    });
  }
}

function deployDesktop() {
  import("./sub_modules/desktop-init").then((desktopInit) => {
    deskResult = desktopInit.desktopInitCode(isSafari, supportsPassive);
    if (toDesk) {
      window.removeEventListener(
        "scroll",
        mobResult.debounce,
        supportsPassive ? { passive: true } : false
      );
    }
  });
  if (toDesk) {
    toDesktop();
    deferDesktop(true);
  } else {
    window.addEventListener("load", () => {
      deferDesktop();
    });
  }
}

function deferMobile(hasCommon = false) {
  import("./sub_modules/mobile-defer").then((mobileDefer) => {
    mobileDefer.testFunction();
  });
  if (!hasCommon) {
    import("./sub_modules/common-defer").then((commonDefer) => {
      commonDefer.testFunction();
      commonDefer.commonDeferInit(isSafari, isIE);
    });
  }
}

function deferDesktop(hasCommon = false) {
  import("./sub_modules/desktop-defer").then((desktopDefer) => {
    desktopDefer.testFunction();
  });
  if (!hasCommon) {
    import("./sub_modules/common-defer").then((commonDefer) => {
      commonDefer.testFunction();
      commonDefer.commonDeferInit(isSafari, isIE);
    });
  }
}

function toMobile() {
  console.log("toMobile");
  typewriterModule.reviewWidth(true);
  prepareForMobile(isSafari);
}

function toDesktop() {
  console.log("toDesktop");
  prepareForDesktop();
  typewriterModule.reviewWidth(false);
  if (mobResult.swiper)
    if (mobResult.swiper.params && mobResult.swiper.params.init === true)
      mobResult.swiper.destroy();
}

// hides preloader, animate assets and inits typeWriter.
function initLanding() {
  preloaderModule.hidePreloader();
  typewriterModule.initWriter(isMobile, supportsPassive);
}

export { navBar, debounce };

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
