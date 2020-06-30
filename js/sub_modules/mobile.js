// jshint esversion: 6

import { navBar, debounce } from "../main.js";

const siteOverlay = document.querySelector(".site-overlay");
const servicesSection = document.getElementById("section-services");
const contactSection = document.getElementById("section-contact");
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
const swiperPagination = document.querySelector(".swiper-pagination");
let designOffset = designProjectsSection.offsetTop;
let clientHeight = document.body.clientHeight;
let scrolledY = 0;
let toggleDelay = 0;
let hasClickListener = false;
let isOpen_Menu = false;
let rightArrowsFlag = true;
let debouncedRightArrows;
// UA sniffing
let isIos =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

const formInfo = document.querySelector(".form-info");

//appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
function styleMobileNav() {
  if (nav.nextElementSibling) {
    const langDiv = nav.parentElement.removeChild(nav.nextElementSibling);
    navList.lastElementChild.appendChild(langDiv);
  }
  const infoSocial = formInfo.removeChild(formInfo.lastElementChild);
  linkSocial.appendChild(infoSocial);
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

function appendInfoSocial() {
  const socialChild = linkSocial.removeChild(linkSocial.firstElementChild);
  formInfo.appendChild(socialChild);
}

// adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu). Small and Large screens.
function toggleNavClasses() {
  scrolledY = window.pageYOffset;
  if (scrolledY > 0) {
    navBar.classList.toggle("nav-white");
    nav.classList.toggle("nav-no-border");
  }
  setTimeout(function () {
    designProjectsSection.classList.toggle("section-low");
    contactSection.classList.toggle("section-low");
    servicesSection.classList.toggle("section-low");
  }, toggleDelay);
  if (!isOpen_Menu) {
    isOpen_Menu = true;
    toggleDelay = 400;
    if (scrolledY > 0) {
      restoreMobileBrand();
    }
  } else {
    isOpen_Menu = false;
    toggleDelay = 0;
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
function initSwiper(isSafari) {
  swiperPagination.classList.add("pagination-bottom");
  if (!isIos || !isSafari) {
    window.addEventListener("DOMContentLoaded", listenToArrow);
  }
}

// adds a listener to rightArrowsContainer that triggers the animation.
function listenToArrow() {
  debouncedRightArrows = debounce(showRightArrows, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener("scroll", debouncedRightArrows);
  rightArrowsContainer.addEventListener("click", slideRightArrows);
  rightArrowsContainer.addEventListener("touchmove", slideRightArrows);
}

// shows arrows when passing through threshold.
function showRightArrows() {
  scrolledY = window.pageYOffset;
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
  if (rightArrowsFlag) {
    rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
    window.removeEventListener("scroll", debouncedRightArrows);
    rightArrowsContainer.removeEventListener("click", slideRightArrows);
    rightArrowsContainer.removeEventListener("touchmove", slideRightArrows);
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
  if (brandMobile.style.display === "none") {
    brandMobile.style.display = "initial";
  }
}
// inits mobile brand svg colors.
function unsetMobileBrand() {
  brandMobile.style.display = "none";
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
  initSwiper,
  styleMobileBrand,
  restoreMobileBrand,
  setMobileBrand,
  unsetMobileBrand,
};
