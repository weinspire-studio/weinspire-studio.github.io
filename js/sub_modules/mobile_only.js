// jshint esversion: 6

import { siteWrapper, navBar } from "../main.js";

console.log("scroll navbar test 3");

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
// const designProjectsSection = document.querySelector(
//   "#section-projects-design"
// );
let hasClickListener = false;
let clickOnBurger = false;

window.addEventListener("touchend", function(e) {
  window.scroll(0, window.scrollY);
});

//appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
function styleMobileNav() {
  navList.parentNode.removeChild(navList);
  navContainer.appendChild(navList);
  // navWhite.classList.toggle("navigation-white");
  // mobile burger and menu
  if (!hasClickListener) {
    burger.addEventListener("click", () => {
      // console.log("clickea" + clickOnBurger);
      // clickOnBurger = true;
      //

      // siteWrapper.scrollTo(0, 500);

      //
      toggleNavClasses();
      // nav.classList.toggle("nav-no-border");
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
  let scrolledYMobile;
  scrolledYMobile = siteWrapper.scrollTop;
  if (scrolledYMobile > 0) {
    // console.log("togglea en el toggle");
    navBar.classList.toggle("nav-white");
    navBlack.classList.toggle("navigation-black");
    nav.classList.toggle("nav-no-border");
    // navWhite.classList.toggle("navigation-white");
    // navBar.classList.toggle("nav-back");
  }
  siteWrapper.classList.toggle("menu-open");
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navList.classList.add("visible");
  navContainer.classList.toggle("translate");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  // svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
}

// const right_arrows = document.querySelectorAll(".right-arrow-container svg");
// const list = document.querySelector(".swiper-wrapper");
// // console.log(window.getComputedStyle(right_arrows[0]));
// // right_arrow_3.classList.add("test-anim");

// // console.log(designProjectsSection.offsetTop);
// // console.log(document.body.clientHeight);

// let trigger =
//   designProjectsSection.offsetTop - document.body.clientHeight + 100;
// // console.log(trigger);
// // let flag = true;
// let last_known_scroll_position = 0;

// // document.addEventListener("DOMContentLoaded", function() {
// //   siteWrapper.addEventListener("scroll", doSomething, true);
// //   list.addEventListener("touchstart", function() {
// //     right_arrows.forEach(arrow => arrow.classList.remove("test-anim"));
// //     siteWrapper.removeEventListener("scroll", doSomething, true);
// //     console.log("entra al remove");
// //   });
// // });

// function doSomething() {
//   console.log("listeneeer");
//   last_known_scroll_position = siteWrapper.scrollTop;
//   if (last_known_scroll_position > trigger) {
//     right_arrows.forEach(arrow => arrow.classList.add("test-anim"));
//     right_arrows[0].style.animationDelay = ".25s";
//     right_arrows[1].style.animationDelay = ".125s";
//   } else {
//     right_arrows.forEach(arrow => arrow.classList.remove("test-anim"));
//   }
//   // doSomethingElse(last_known_scroll_position);
// }
// function doSomethingElse(last_known_scroll_position) {
//   console.log(last_known_scroll_position);
// }

export {
  nav,
  navList,
  navElements,
  navContainer,
  navBlack,
  clickOnBurger,
  styleMobileNav,
  toggleNavClasses
};
