// jshint esversion: 6

import { unbindImages } from "../sub_modules/jquery";

const navBar = document.getElementById("section-navbar");
const nav = document.getElementById("home");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const flagsContainer = document.getElementById("lang");
const brandMobile = document.getElementById("brand-mobile-svg");
const navList = document.querySelector(".nav-list");
const linkSocial = document.getElementById("link-social");
const navContainer = document.querySelector(".navigation-container");
const formInfo = document.querySelector(".form-info");
const siteOverlay = document.querySelector(".site-overlay");
const heroImgContainer = document.querySelector(".hero.hero-img");
const ctaButton = document.getElementById("hero-cta");
const burger = document.querySelector(".burger");
const navElements = document.querySelectorAll(".nav-list li");

let isOpen_Menu = false;

//code that executes only in phones and small tablets screens (< 801px).
function mobileInitCode(supportsPassive, calledBefore, debounce) {
  let debouncedNavMobile;
  setMobileBrand();
  prepareMobileNav();
  if (!calledBefore) styleMobileNav();
  styleMobNavOnScroll();
  appendCtaMobile();
  unbindImages();
  debouncedNavMobile = debounce(styleMobNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener(
    "scroll",
    debouncedNavMobile,
    supportsPassive ? { passive: true } : false
  );
  return debouncedNavMobile;
}

// appends flags, social svgs and navList to navContainer (because of burger z-index issue)
function prepareMobileNav() {
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
}
//adds animation to links and click listener to menu burger.
function styleMobileNav() {
  burger.addEventListener("click", () => {
    toggleNavClasses();
    navElements.forEach((navEl, index) => {
      navEl.style.animationDelay = `${(0.3 + index / 15.5).toFixed(2)}s`;
      navEl.classList.toggle("nav-link-anim");
      navEl.classList.toggle("invisible");
    });
  });
}

// adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu).
function toggleNavClasses(fromDesk = false) {
  let scrolledY = window.pageYOffset;
  if (scrolledY > 0) {
    nav.classList.toggle("nav-no-border");
    if (!fromDesk) navBar.classList.toggle("nav-white");
    if (!isOpen_Menu) {
      restoreMobileBrand();
      isOpen_Menu = true;
    } else {
      styleMobileBrand();
      isOpen_Menu = false;
    }
  }
  document.documentElement.classList.toggle("overflow-hidden");
  siteOverlay.classList.toggle("overlay-active");
  navContainer.classList.toggle("translate");
  navList.classList.add("visible");
  navList.classList.toggle("open");
  burger.classList.toggle("cross");
}

//adds or removes classes in order to give white styles to the nav.
function styleMobNavOnScroll() {
  let scrolledY = window.pageYOffset;
  if (scrolledY !== 0) {
    if (!isOpen_Menu) {
      styleMobileBrand();
      flagsContainer.classList.remove("flag-invisible");
      navBar.classList.add("nav-white");
      navWhiteBack.classList.add("nav-white-back");
      navShadow.classList.add("nav-shadow");
    }
  } else {
    restoreMobileBrand();
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
    flagsContainer.classList.remove("flag-invisible");
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
  const ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
  heroImgContainer.appendChild(ctaBtn);
}

export { mobileInitCode, toggleNavClasses };
