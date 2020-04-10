// jshint esversion: 6

import { siteWrapper, navBar, debounce } from "../main.js";

// console.log("scroll navbar again test 8");

const siteOverlay = document.querySelector(".site-overlay");
const servicesSection = document.getElementById("section-services");
const contactSection = document.getElementById("section-contact");
const designProjectsSection = document.getElementById(
  "section-projects-design"
);
const nav = document.getElementById("home");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navContainer = document.querySelector(".navigation-container");
const burger = document.querySelector(".burger");
const rightArrowsContainer = document.querySelector(".right-arrow-container");
const rightArrows = document.querySelectorAll(".right-arrow-container svg");
const swiperPagination = document.querySelector(".swiper-pagination");

let designOffset = designProjectsSection.offsetTop;
let clientHeight = document.body.clientHeight;
let scrolledY = 0;
let toggleDelay = 0;
let hasClickListener = false;
let debouncedRightArrows;
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
  scrolledY = siteWrapper.scrollTop;
  if (scrolledY > 0) {
    navBar.classList.toggle("nav-white");
    nav.classList.toggle("nav-no-border");
  }
  if (isIos === false) {
    siteOverlay.classList.toggle("overlay-active");
  } else {
    siteOverlay.classList.toggle("overlay-active");
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

// adds a listener to rightArrowsContainer that triggers the animation.
function listenToArrow() {
  if (!isIos) {
    debouncedRightArrows = debounce(showRightArrows, 200, {
      leading: true,
      trailing: true,
    });
    siteWrapper.addEventListener("scroll", debouncedRightArrows);
    rightArrowsContainer.addEventListener("click", slideRightArrows);
    rightArrowsContainer.addEventListener("touchmove", slideRightArrows);
  }
}
// shows arrows when passing through threshold.
function showRightArrows() {
  scrolledY = siteWrapper.scrollTop;
  let threshold = designOffset - clientHeight + 100;
  if (scrolledY > threshold) {
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-wave"));
    rightArrows[0].style.animationDelay = "250ms";
    rightArrows[1].style.animationDelay = "125ms";
    setTimeout(function () {
      slideRightArrows();
    }, 5000);
  }
}

// adds animation to arrow and removes listeners.
function slideRightArrows() {
  rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
  rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
  siteWrapper.removeEventListener("scroll", debouncedRightArrows);
  rightArrowsContainer.removeEventListener("click", slideRightArrows);
  rightArrowsContainer.removeEventListener("touchmove", slideRightArrows);
}

// styles Swiper (arrows and pagination) depending on mobile OS
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
  modifySwiperForIos,
  listenToArrow,
};
