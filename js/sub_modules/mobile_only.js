// jshint esversion: 6

import {
  siteWrapper,
  navBar,
  clientHeight,
  // navWhite,
  // designOffset,
} from "../main.js";

console.log("scroll navbar again test 8");
const overlay = document.querySelector(".site-overlay");
const servicesSection = document.querySelector("#section-services");
const contactSection = document.querySelector("#section-contact");
const designProjectsSection = document.querySelector(
  "#section-projects-design"
);
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navContainer = document.querySelector(".navigation-container");
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");
// const navImg = document.querySelector("nav img");
// const heroText = document.querySelector(".hero-text");
// const navWhite = document.querySelector(".navigation-color-white");
// const navBlack = document.querySelector(".navigation-overlay-black");
// const footer = document.querySelector("#footer");
let designOffset = designProjectsSection.offsetTop;
let scrolledY = 0;
let toggleDelay = 0;
let hasClickListener = false;
// UA sniffing
let isIos =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;
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
    navBar.classList.toggle("nav-white");
    nav.classList.toggle("nav-no-border");
  }
  if (isIos === false) {
    overlay.classList.toggle("overlay-active");
  } else {
    overlay.classList.toggle("overlay-active");
    siteWrapper.classList.toggle("menu-open-i");
  }

  setTimeout(function () {
    designProjectsSection.classList.toggle("lower-section");
    contactSection.classList.toggle("lower-section");
    servicesSection.classList.toggle("lower-section");
  }, toggleDelay);
  if (toggleDelay === 0) {
    toggleDelay = 400;
  } else {
    toggleDelay = 0;
  }
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navList.classList.add("visible");
  navContainer.classList.toggle("translate");
  // navImg.classList.toggle("logo-index");
  // heroText.classList.toggle("hero-text-opacity");
  // footer.classList.toggle("footer-index");
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
  // navBlack,
  styleMobileNav,
  toggleNavClasses,
  // listenToArrow
};
