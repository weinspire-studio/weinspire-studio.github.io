// jshint esversion: 6

import * as preloaderModule from "./sub_modules/preloader";
import * as mobileModule from "./sub_modules/mobile";
import * as desktopModule from "./sub_modules/desktop";
import * as typewriterModule from "./sub_modules/typewriter";
import * as animationsModule from "./sub_modules/gsap-scrollmagic";
import * as swiperModule from "./sub_modules/swiper";
import * as jQueryModule from "./sub_modules/jquery";
import * as contactModule from "./sub_modules/contact";
import * as locationModule from "./sub_modules/location";
import debounce from "lodash/debounce";
import svg4everybody from "./sub_modules/svg4everybody";
import "./sub_modules/classList";

// polyfill forEach IE11.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// console.log(navigator.language);
// console.log(Intl);
// 0 1px 3px rgba(0,0,0,.3)

//VARIABLES
const mobileScreenMQ = window.matchMedia("(max-width: 800px)");
const navBar = document.getElementById("section-navbar");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const flagsContainer = document.getElementById("lang");
let isSafari = window.safari !== undefined;
let hasScrollListenerMobile = false;
let hasListenersDesktop = false;
let debouncedNavDesktop;
let debouncedNavMobile;
let bindedDebouncedNavDesktop;
let swiper;
let isMobile;
let listenToFlags;

const heroImgContainer = document.querySelector(".hero.hero-img");
const heroTextContainer = document.querySelector(".hero.hero-text");
const ctaButton = document.getElementById("hero-cta");

//FUNCTIONS INVOCATIONS
init();
initOnWidthChange();
svg4everybody({ attributeName: "data-href", polyfill: true });
locationModule.getUserUbication();
animationsModule.prepareRequests();
jQueryModule.smoothScroll();
contactModule.initContactForms(isSafari);
window.addEventListener("load", initLanding);

//FUNCTIONS DEFINITIONS
//on pageload, executes the following code, depending on screen width.
function init() {
  if (mobileScreenMQ.matches) {
    isMobile = true;
    mobileCode();
  } else {
    isMobile = false;
    desktopCode();
  }
}

// adds listener that executes when screen width changes (passing by 801px).
function initOnWidthChange() {
  mobileScreenMQ.addListener(() => {
    if (mobileScreenMQ.matches) {
      isMobile = true;
      mobileCode();
    } else {
      isMobile = false;
      desktopCode();
    }
  });
}

// hides preloader, animate assets and inits typeWriter.
function initLanding() {
  preloaderModule.hidePreloader();
  typewriterModule.initWriter(isMobile);
}

//code that executes only in desktop and large tablets screens (> 801px).
function desktopCode() {
  addClassesToSvgs(false);
  styleNavOnScroll(false);
  desktopModule.prepareDesktopNav();
  desktopModule.initModal();
  if (isSafari) {
    desktopModule.animateImagesSafari();
  } else {
    jQueryModule.animateImages();
  }
  debouncedNavDesktop = debounce(styleNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  bindedDebouncedNavDesktop = debouncedNavDesktop.bind(null, false);
  window.addEventListener("scroll", bindedDebouncedNavDesktop);
  hasListenersDesktop = true;
  if (hasScrollListenerMobile) {
    appendCtaDesktop();
    desktopModule.restoreDesktopNav();
    window.removeEventListener("scroll", debouncedNavMobile);
    typewriterModule.reviewWidth(false);
    hasScrollListenerMobile = false;
  }
  if (swiper && swiper.params.init === true) {
    swiper.destroy();
  }
}

//code that executes only in phones and small tablets screens (< 801px).
function mobileCode() {
  addClassesToSvgs();
  styleNavOnScroll();
  appendCtaMobile();
  mobileModule.styleMobileNav();
  jQueryModule.unbindImages();
  mobileModule.initSwiper(isSafari);
  debouncedNavMobile = debounce(styleNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener("scroll", debouncedNavMobile);
  hasScrollListenerMobile = true;
  if (hasListenersDesktop) {
    window.removeEventListener("scroll", bindedDebouncedNavDesktop);
    typewriterModule.reviewWidth(true);
    desktopModule.closeModal();
    desktopModule.destroyModal();
    if (isSafari) {
      desktopModule.removeImagesListeners();
    }
    hasListenersDesktop = false;
  }
  swiper = swiperModule.defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();
}

//adds or removes classes in order to give white styles to the nav.
function styleNavOnScroll(inMobile = true) {
  let scrolledY = window.pageYOffset;
  if (scrolledY !== 0) {
    if (!mobileModule.isOpen_Menu) {
      if (inMobile) {
        mobileModule.styleMobileBrand();
      } else {
        desktopModule.styleDesktopBrand();
        flagsContainer.removeEventListener("click", listenToFlags);
        flagsContainer.classList.add("flag-invisible");
      }
      navBar.classList.add("nav-white");
      navWhiteBack.classList.add("nav-white-back");
      navShadow.classList.add("nav-shadow");
    }
  } else {
    if (inMobile) {
      mobileModule.restoreMobileBrand();
    } else {
      desktopModule.restoreDesktopBrand();
    }
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
    flagsContainer.classList.remove("flag-invisible");
    flagsContainer.addEventListener(
      "click",
      (listenToFlags = (e) => {
        styleFlags(e.target);
      })
    );
  }
}

function addClassesToSvgs(inMobile = true) {
  if (inMobile) {
    mobileModule.setMobileBrand();
    desktopModule.unsetDesktopBrand();
  } else {
    desktopModule.setDesktopBrand();
    mobileModule.unsetMobileBrand();
  }
}

function styleFlags(target) {
  if (target.tagName === "P") {
    if (target.classList.contains("inactive")) {
      target.classList.remove("inactive");
      target.classList.add("active");
      if (target.nextElementSibling) {
        target.nextElementSibling.classList.remove("active");
        target.nextElementSibling.classList.add("inactive");
      } else {
        target.previousElementSibling.classList.remove("active");
        target.previousElementSibling.classList.add("inactive");
      }
    }
  }
}

function appendCtaMobile() {
  const ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
  heroImgContainer.appendChild(ctaBtn);
}

function appendCtaDesktop() {
  const ctaBtn = heroImgContainer.removeChild(ctaButton);
  heroTextContainer.appendChild(ctaBtn);
}

export { navBar, debounce };

//
//
// -----------------
// $("#section-projects-design ul").slick({
//   slide: "li"
// });

// $("#section-projects-design ul").slick({
//   autoplay: true,
//   autoplaySpeed: 2000,
//   fade: true,
//   arrows: false
// });

// Plain JS way (projects-design).
// const list = document.querySelectorAll("#section-projects-design li");
// // console.log(list);
// list.forEach(l => {
//   l.addEventListener("mouseover", expand);
//   l.addEventListener("mouseleave", contract);
// });

// list[0].addEventListener("mouseover", () => {
//   console.log("expandedasd");
// });

// function expand() {
//   if (this.nextElementSibling !== null) {
//     this.classList.remove("contracted");
//     this.classList.add("expanded");
//     this.lastElementChild.classList.add("show-caption");
//     let siblings = getAllSiblings(this, this.parentElement);
//     siblings.forEach(el => {
//       el.classList.remove("expanded");
//       el.classList.add("contracted");
//     });
//   }
// }

// function contract() {
//   this.classList.remove("expanded");
//   this.lastElementChild.classList.remove("show-caption");
//   let siblings = getAllSiblings(this, this.parentElement);
//   siblings.forEach(el => {
//     el.classList.remove("contracted");
//   });
// }

// function getAllSiblings(element, parent) {
//   const children = [...parent.children];
//   children.length = 5;
//   return children.filter(child => child !== element);
// }

//// /////////// /////
// changes the href of a navLink depending on whether the site is in home or in another page.
// const anchorHome = document.querySelector(".nav-home");
// const anchorContact = document.querySelector(".nav-contact");

// console.log(anchorHome);
// console.log(window.location.href);
// console.log(anchorHome.href);

// if (
//   window.location.href === "https://weinspire-studio.github.io/home" ||
//   window.location.href === "https://weinspire-studio.github.io/home/"
// ) {
//   anchorHome.href = "/home/#home";
//   console.log("home");
// }

// function styleDesktopNav() {
// let scro = siteWrapper.scrollHeight;
// console.log("height" + scro);
// console.log(window.innerHeight);
// let scrolledY = siteWrapper.scrollTop;
// console.log(scrolledY);
// }

// svg styling! used another approach, jic!
// let x = getComputedStyle(document.documentElement);
// let y = x.getPropertyValue("--color-1");

// let asd = document.querySelector("#brand-mobile-svg");
// console.log(asd.firstElementChild);

// let sheet = document.styleSheets[0];
// console.log(sheet);
// let classes = sheet.rules || sheet.cssRules;
// console.log(classes[23]);

// TODO:
// shadows
// Logos and svg background (bottom on mobile)
// when navbar mobile opens, click everywhere to close it.
// see navbar classes on burger click (specially on iphone)
// social network in navbar?
// navbar mobile open bug (z-index) DONE
// bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes) DONE
// burger ontap mobile! (see iphone, selection square)
// accesibility svg titles - svg sprite
// inline svg catched?! see css tricks tutorial
// page loader!!
// dynamic text! See youtube programming video!!
// bugs: button focus blue (in chrome),
// green inputs after submit DONE
// in projects-design: if image stretches more than image witdh: repeat: round or size cover
// lazy - loading!
//download swipper only on mobile? conditional script
// on select input from contact form BUG! iphone extra swipe
// content link ?
// mousedown touch start?
//auto prefixer: prefix animations? maybe extend sass or something? Each keyframe with different prefix!
// (caption onpageload in above-the-fold due to img from unsplash)

// outline on burger div?

// scroll anchoring onwidthchange init?
// test foreach in win 11, and other compatibility issues. GRID! height 100%

// inline css repeated

// us, newsletter (and footer), bootloader, svgs in menu!
// scroll on menu open? menu icons!

// postcss? autoprefixer? html min? jquery as an external link? npm audit!
// ::selection background-color
// svg sprite loading twice?
