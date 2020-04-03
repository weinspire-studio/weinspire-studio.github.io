// jshint esversion: 6

// import { siteWrapper } from "../main.js";

console.log("scroll navbar again test 2");

const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navContainer = document.querySelector(".navigation-container");
const nav = document.querySelector("nav");
// // const navWhite = document.querySelector(".navigation-color-white");
const navBlack = document.querySelector(".navigation-overlay-black");
const navImg = document.querySelector("nav img");
const burger = document.querySelector(".burger");
const heroText = document.querySelector(".hero-text");
const footer = document.querySelector("#footer");
// const designProjectsSection = document.querySelector(
//   "#section-projects-design"
// );
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
    // navBar.classList.toggle("nav-white");
    navBlack.classList.toggle("navigation-black");
    nav.classList.toggle("nav-no-border");
    // navWhite.classList.toggle("navigation-white");
    // navBar.classList.toggle("nav-back");
  }
  if (isIos === false) {
    siteWrapper.classList.toggle("menu-open");
  } else {
    siteWrapper.classList.toggle("menu-open-i");
  }
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navList.classList.add("visible");
  navContainer.classList.toggle("translate");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  // svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
}

// const rightArrowsContainer = document.querySelector(".right-arrow-container");
// const rightArrows = document.querySelectorAll(".right-arrow-container svg");
// const list = document.querySelector(".swiper-wrapper");
// let trigger =
//   designProjectsSection.offsetTop - document.body.clientHeight + 100;

// document.addEventListener("DOMContentLoaded", function() {
//   siteWrapper.addEventListener("scroll", showRightArrows, true);
//   rightArrowsContainer.addEventListener("click", slideRightArrows);
//   list.addEventListener("touchmove", function() {
//     rightArrows.forEach(arrow => arrow.classList.remove("arrow-wave"));
//     siteWrapper.removeEventListener("scroll", showRightArrows, true);
//     rightArrowsContainer.removeEventListener("click", slideRightArrows);
//   });
// });

// function showRightArrows() {
//   console.log("listeneeer");
//   scrolledY = siteWrapper.scrollTop;
//   if (scrolledY > trigger) {
//     rightArrows.forEach(arrow => arrow.classList.add("arrow-wave"));
//     rightArrows[0].style.animationDelay = "250ms";
//     rightArrows[1].style.animationDelay = "125ms";
//   } else {
//     rightArrows.forEach(arrow => arrow.classList.remove("arrow-wave"));
//   }
// }

// function slideRightArrows() {
//   rightArrows.forEach(arrow => arrow.classList.add("arrow-slide"));
//   siteWrapper.removeEventListener("scroll", showRightArrows, true);
//   rightArrowsContainer.removeEventListener("click", slideRightArrows);
// }

export {
  nav,
  navList,
  navElements,
  navContainer,
  navBlack,
  styleMobileNav,
  toggleNavClasses
};
