// jshint esversion: 6

// import "core-js/modules/es.promise";
// import "core-js/modules/es.array.iterator";

import * as mobileModule from "../sub_modules/mobile";
import * as jQueryModule from "../sub_modules/jquery";
import * as swiperModule from "../sub_modules/swiper";
import debounce from "lodash/debounce";

const navBar = document.getElementById("section-navbar");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const flagsContainer = document.getElementById("lang");

// let debouncedNavMobile;

//code that executes only in phones and small tablets screens (< 801px).
function mobileInitCode(isSafari, supportsPassive) {
  console.log("init mobile");
  mobileModule.setMobileBrand();
  styleMobNavOnScroll();
  mobileModule.appendCtaMobile();
  mobileModule.styleMobileNav();
  jQueryModule.unbindImages();
  mobileModule.initSwiperAnim(isSafari, supportsPassive);
  let debouncedNavMobile = debounce(styleMobNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener(
    "scroll",
    debouncedNavMobile,
    supportsPassive ? { passive: true } : false
  );
  let swiper = swiperModule.defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();

  return { swiper: swiper, debounce: debouncedNavMobile };
}

//adds or removes classes in order to give white styles to the nav.
function styleMobNavOnScroll() {
  let scrolledY = window.pageYOffset;
  if (scrolledY !== 0) {
    if (!mobileModule.isOpen_Menu) {
      mobileModule.styleMobileBrand();
      flagsContainer.classList.remove("flag-invisible");
      navBar.classList.add("nav-white");
      navWhiteBack.classList.add("nav-white-back");
      navShadow.classList.add("nav-shadow");
    }
  } else {
    mobileModule.restoreMobileBrand();
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
    flagsContainer.classList.remove("flag-invisible");
  }
}

function deleteListener(supportsPassive) {
  window.removeEventListener(
    "scroll",
    debouncedNavMobile,
    supportsPassive ? { passive: true } : false
  );
}

export { mobileInitCode, deleteListener };
