// jshint esversion: 6

import * as desktopModule from "../sub_modules/desktop";
import * as jQueryModule from "../sub_modules/jquery";
import debounce from "lodash/debounce";

const navBar = document.getElementById("section-navbar");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const flagsContainer = document.getElementById("lang");

let debouncedNavDesktop;
// let bindedDebouncedNavDesktop;

function desktopInitCode(isSafari, supportsPassive) {
  console.log("init desktop");
  // desktopModule.setDesktopBrand();
  desktopModule.prepareDesktopNav();
  styleDeskNavOnScroll();
  desktopModule.initModal();
  if (isSafari) desktopModule.animateImagesSafari();
  else jQueryModule.animateImages();
  debouncedNavDesktop = debounce(styleDeskNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener(
    "scroll",
    debouncedNavDesktop,
    supportsPassive ? { passive: true } : false
  );
  return { debounce: debouncedNavDesktop };
}

function styleDeskNavOnScroll() {
  let scrolledY = window.pageYOffset;
  if (scrolledY !== 0) {
    desktopModule.styleDesktopBrand();
    // flagsContainer.removeEventListener("click", listenToFlags);
    flagsContainer.classList.add("flag-invisible");
    navBar.classList.add("nav-white");
    navWhiteBack.classList.add("nav-white-back");
    navShadow.classList.add("nav-shadow");
  } else {
    desktopModule.restoreDesktopBrand();
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
    flagsContainer.classList.remove("flag-invisible");
  }
}

function deleteListener(supportsPassive) {
  window.removeEventListener(
    "scroll",
    debouncedNavDesktop,
    supportsPassive ? { passive: true } : false
  );
}

export { desktopInitCode, deleteListener };
