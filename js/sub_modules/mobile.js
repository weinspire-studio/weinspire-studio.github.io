// jshint esversion: 6

import { navBar, debounce } from "../main.js";

const siteOverlay = document.querySelector(".site-overlay");
const designProjectsSection = document.getElementById("section-projects-design"); //prettier-ignore
const nav = document.getElementById("home");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const linkSocial = document.getElementById("link-social");
const navContainer = document.querySelector(".navigation-container");
const burger = document.querySelector(".burger");
const brandMobile = document.querySelector("#brand-mobile-svg");
const rightArrowsContainer = document.querySelector(".right-arrow-container");
const rightArrows = document.querySelectorAll(".right-arrow-container svg");
const formInfo = document.querySelector(".form-info");
let designOffset = designProjectsSection.offsetTop;
let clientHeight = document.body.clientHeight;
let scrolledY = 0;
let hasClickListener = false;
let isOpen_Menu = false;
let rightArrowsFlag = true;
let debouncedRightArrows;
let bindedListenToArrow;
let bindedSlideRightArrows;
let bindedDebouncedShowRightArrows;
// UA sniffing
let isIos =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

//appends flags, social svgs and navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
function styleMobileNav() {
  if (nav.nextElementSibling) {
    const langDiv = nav.parentElement.removeChild(nav.nextElementSibling);
    navList.lastElementChild.appendChild(langDiv);
  }
  if (formInfo.lastElementChild) {
    const infoSocial = formInfo.removeChild(formInfo.lastElementChild);
    linkSocial.appendChild(infoSocial);
  }
  navList.parentNode.removeChild(navList);
  navContainer.appendChild(navList);
  // mobile burger and menu
  if (!hasClickListener) {
    burger.addEventListener("click", () => {
      toggleNavClasses();
      navElements.forEach((navEl, index) => {
        navEl.style.animationDelay = `${(0.3 + index / 15.5).toFixed(2)}s`;
        navEl.classList.toggle("nav-link-anim");
        navEl.classList.toggle("invisible");
      });
    });
  }
  hasClickListener = true;
}

// appends social svgs to contact info container
function appendInfoSocial() {
  const socialChild = linkSocial.removeChild(linkSocial.firstElementChild);
  formInfo.appendChild(socialChild);
}

// adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu).
function toggleNavClasses() {
  scrolledY = window.pageYOffset;
  if (scrolledY > 0) {
    navBar.classList.toggle("nav-white");
    nav.classList.toggle("nav-no-border");
  }
  if (!isOpen_Menu) {
    isOpen_Menu = true;
    if (scrolledY > 0) {
      restoreMobileBrand();
    }
  } else {
    isOpen_Menu = false;
    if (scrolledY > 0) {
      styleMobileBrand();
    }
  }
  document.documentElement.classList.toggle("overflow-hidden");
  siteOverlay.classList.toggle("overlay-active");
  navContainer.classList.toggle("translate");
  navList.classList.add("visible");
  navList.classList.toggle("open");
  burger.classList.toggle("cross");
}

// styles Swiper (arrows and pagination) depending on mobile OS.
function initSwiperAnim(isSafari, supportsPassive) {
  if (!isIos || !isSafari) {
    bindedListenToArrow = listenToArrow.bind(null, supportsPassive);
    window.addEventListener("DOMContentLoaded", bindedListenToArrow);
  }
}

// adds a listener to rightArrowsContainer that triggers the animation.
function listenToArrow(supportsPassive) {
  debouncedRightArrows = debounce(showRightArrows, 200, {
    leading: true,
    trailing: true,
  });
  bindedDebouncedShowRightArrows = debouncedRightArrows.bind(
    null,
    supportsPassive
  );
  window.addEventListener(
    "scroll",
    bindedDebouncedShowRightArrows,
    supportsPassive ? { passive: true } : false
  );
  bindedSlideRightArrows = slideRightArrows.bind(null, supportsPassive);
  rightArrowsContainer.addEventListener("click", bindedSlideRightArrows);
  rightArrowsContainer.addEventListener(
    "touchmove",
    bindedSlideRightArrows,
    supportsPassive ? { passive: true } : false
  );
}

// shows arrows when passing through threshold.
function showRightArrows(supportsPassive) {
  scrolledY = window.pageYOffset;
  let threshold = designOffset + clientHeight - 100;
  if (scrolledY > threshold) {
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-wave"));
    rightArrows[0].style.animationDelay = "250ms";
    rightArrows[1].style.animationDelay = "125ms";
    setTimeout(function () {
      slideRightArrows(supportsPassive);
    }, 15000);
  }
}

// adds animation to arrow and removes listeners.
function slideRightArrows(supportsPassive) {
  if (rightArrowsFlag) {
    rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
    window.removeEventListener(
      "scroll",
      bindedDebouncedShowRightArrows,
      supportsPassive ? { passive: true } : false
    );
    rightArrowsContainer.removeEventListener("click", bindedSlideRightArrows);
    rightArrowsContainer.removeEventListener(
      "touchmove",
      bindedSlideRightArrows,
      supportsPassive ? { passive: true } : false
    );
    rightArrowsFlag = false;
  }
}

// changes mobile svg brand colors.
function styleMobileBrand() {
  brandMobile.classList.add("brand-color");
  brandMobile.classList.remove("brand-negative");
}

// restores mobile svg brand color to init.
function restoreMobileBrand() {
  brandMobile.classList.remove("brand-color");
  brandMobile.classList.add("brand-negative");
}

// inits mobile brand svg colors.
function setMobileBrand() {
  brandMobile.classList.add("brand-negative");
}

function appendCtaMobile() {
  const heroImgContainer = document.querySelector(".hero.hero-img");
  const ctaButton = document.getElementById("hero-cta");
  const ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
  heroImgContainer.appendChild(ctaBtn);
}

export {
  nav,
  navList,
  navElements,
  navContainer,
  isOpen_Menu,
  styleMobileNav,
  toggleNavClasses,
  appendInfoSocial,
  initSwiperAnim,
  styleMobileBrand,
  restoreMobileBrand,
  setMobileBrand,
  appendCtaMobile,
};
