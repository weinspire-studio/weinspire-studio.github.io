// jshint esversion: 6

import { siteWrapper, navBar } from "../main.js";

const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navContainer = document.querySelector(".navigation-container");
const navWhite = document.querySelector(".navigation-color-white");
const navBlack = document.querySelector(".navigation-overlay-black");
const heroText = document.querySelector(".hero-text");
const burger = document.querySelector(".burger");
const navImg = document.querySelector("nav img");
const footer = document.querySelector("#footer");
let hasClickListener = false;

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
  let scrolledYMobile;
  scrolledYMobile = siteWrapper.scrollTop;
  if (scrolledYMobile > 0) {
    navBar.classList.toggle("nav-white");
    navBlack.classList.toggle("navigation-black");
    navWhite.classList.toggle("navigation-white");
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

export { navList, navElements, navContainer, styleMobileNav, toggleNavClasses };
