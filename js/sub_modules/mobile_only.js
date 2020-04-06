// jshint esversion: 6

import {
  siteWrapper,
  navBar,
  navWhite,
  clientHeight,
  // designOffset,
} from "../main.js";

console.log("scroll navbar again test 8");
const overlay = document.querySelector(".overlay");

const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navContainer = document.querySelector(".navigation-container");
const nav = document.querySelector("nav");
// const navWhite = document.querySelector(".navigation-color-white");
const navBlack = document.querySelector(".navigation-overlay-black");
const navImg = document.querySelector("nav img");
const burger = document.querySelector(".burger");
const heroText = document.querySelector(".hero-text");
const footer = document.querySelector("#footer");
const designProjectsSection = document.querySelector(
  "#section-projects-design"
);
let designOffset = designProjectsSection.offsetTop;
let scrolledY = 0;
let hasClickListener = false;
// UA sniffing
let isIos =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

// const navBar = document.querySelector("#section-navbar");
// heroText.classList.add("test-class");
// navBar.classList.add("test-class");

//appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
function styleMobileNav() {
  navList.parentNode.removeChild(navList);
  navContainer.appendChild(navList);
  // mobile burger and menu
  if (!hasClickListener) {
    burger.addEventListener("click", () => {
      toggleNavClasses();
      navElements.forEach((navEl, index) => {
        navEl.style.animationDelay = `${0.3 + index / 15.5}s`;
        navEl.classList.toggle("nav-link-anim");
        navEl.classList.toggle("invisible");
      });
    });
  }
  hasClickListener = true;
}

// adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu). Small and Large screens.
function toggleNavClasses() {
  // let scrolledY;
  scrolledY = siteWrapper.scrollTop;
  if (scrolledY > 0) {
    // console.log("togglea en el toggle");
    navBar.classList.toggle("nav-white");
    // navBlack.classList.toggle("navigation-black");
    // nav.classList.toggle("nav-no-border");
    // navWhite.classList.toggle("lower-navigation-white");
  }
  if (isIos === false) {
    // siteWrapper.classList.toggle("menu-open");
    overlay.classList.toggle("overlay-active");
  } else {
    siteWrapper.classList.toggle("menu-open-i");
    overlay.classList.toggle("overlay-active-i");
  }
  designProjectsSection.classList.toggle("lower-design-projects");
  // overlay.classList.toggle("overlay-active");
  // overlay.style.zIndex = 10;
  // overlay.style.opacity = 1;
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navList.classList.add("visible");
  navContainer.classList.toggle("translate");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  // svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
}

const rightArrowsContainer = document.querySelector(".right-arrow-container");
const rightArrows = document.querySelectorAll(".right-arrow-container svg");
const swiperPagination = document.querySelector(".swiper-pagination");

modifySwiperForIos();

function listenToArrow() {
  siteWrapper.addEventListener("scroll", showRightArrows);
  rightArrowsContainer.addEventListener("click", slideRightArrows);
  rightArrowsContainer.addEventListener("touchmove", slideRightArrows);
}

function showRightArrows() {
  console.log("listeneeer");
  scrolledY = siteWrapper.scrollTop;
  let trigger = designOffset - clientHeight + 100;
  if (scrolledY > trigger) {
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-wave"));
    rightArrows[0].style.animationDelay = "250ms";
    rightArrows[1].style.animationDelay = "125ms";
    setTimeout(function () {
      rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
      rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
    }, 5000);
  } else {
    rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
  }
}

function slideRightArrows() {
  rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
  rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
  siteWrapper.removeEventListener("scroll", showRightArrows);
  rightArrowsContainer.removeEventListener("click", slideRightArrows);
  rightArrowsContainer.removeEventListener("touchmove", slideRightArrows);
  window.removeEventListener("DOMContentLoaded", listenToArrow);
}

// const swiperPagination = document.querySelector(".swiper-pagination");

function modifySwiperForIos() {
  if (isIos) {
    swiperPagination.classList.add("pagination-bottom");
    window.removeEventListener("DOMContentLoaded", listenToArrow);
  } else {
    swiperPagination.classList.add("pagination-middle");
    window.addEventListener("DOMContentLoaded", listenToArrow);
  }
}

export {
  nav,
  navList,
  navElements,
  navContainer,
  navBlack,
  styleMobileNav,
  toggleNavClasses,
  // listenToArrow
};
