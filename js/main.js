// jshint esversion: 6

import * as mobileModule from "./sub_modules/mobile_only";
import * as desktopModule from "./sub_modules/desktop_only";
import * as swiperModule from "./sub_modules/swiper";
import * as jQueryModule from "./sub_modules/jquery";
import * as contactModule from "./sub_modules/contact";

//VARIABLES
const siteWrapper = document.querySelector("#site-wrapper");
// const nav = document.querySelector("nav");
const navBar = document.querySelector("#section-navbar");
const notMobileScreenMQ = window.matchMedia("(min-width: 801px)");
const navWhite = document.querySelector(".navigation-color-white");
// const lineElements = document.querySelectorAll(".burger div");
// const svgArrow = document.querySelector("#footer #up-arrow");
// const svgBackground = document.querySelector("#svg-background");
// const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");

let hasScrollListener = false;
let swiper;

jQueryModule.smoothScroll();
contactModule.validateContactForm();
contactModule.submitContactForm();
//
//

// navBar.style.backgroundColor = "blue";

// navBar.classList.add("test-class");

// window.addEventListener("load", function() {
//   navBar.classList.add("nav-white");
//   console.log("asddd");
// });

//on pageload, executes the following code, depending on screen width.
window.addEventListener("DOMContentLoaded", function() {
  if (notMobileScreenMQ.matches) {
    desktopCode();
  } else {
    mobileCode();
  }
});

// adds listener that executes code when screen width changes (passing by 801px).
notMobileScreenMQ.addListener(() => {
  if (notMobileScreenMQ.matches) {
    desktopCode();
  } else {
    mobileCode();
  }
});

//FUNCTIONS
//code that executes only in desktop and large tablets screens (> 801px).
function desktopCode() {
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  } else {
    desktopModule.restoreDesktopNav();
  }
  styleNavOnScroll();
  desktopModule.styleAnchorOnHover();
  jQueryModule.animateImages();
  if (swiper && swiper.params.init === true) {
    swiper.destroy();
  }
}

//code that executes only in phones and small tablets screens (< 801px).
function mobileCode() {
  styleNavOnScroll();
  mobileModule.styleMobileNav();
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }
  jQueryModule.unbindImages();
  swiper = swiperModule.defineSwiper();
  swiper.on("init", function() {
    swiper.params.init = true;
  });
  swiper.init();
}

//adds or removes classes in order to give white styles to the nav.
function styleNavOnScroll() {
  let scrolledY = siteWrapper.scrollTop;
  if (scrolledY > 0) {
    console.log("aplica");
    navBar.classList.add("nav-white");
    navWhite.classList.add("navigation-white");
  } else {
    navBar.classList.remove("nav-white");
    navWhite.classList.remove("navigation-white");
  }
}

// const navList = document.querySelector(".nav-list");
// const navElements = document.querySelectorAll(".nav-list li");
// const navContainer = document.querySelector(".navigation-container");
// const burger = document.querySelector(".burger");
// const navWhite = document.querySelector(".navigation-color-white");
// const nav = document.querySelector("nav");
// const navBlack = document.querySelector(".navigation-overlay-black");
// const navImg = document.querySelector("nav img");
// const heroText = document.querySelector(".hero-text");
// const footer = document.querySelector("#footer");
// const designProjectsSection = document.querySelector(
//   "#section-projects-design"
// );
// let scrolledY = 0;
// UA sniffing
// let isIos =
// (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
// (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
// !window.MSStream;

// let hasClickListener = false;
// heroText.classList.add("test-class");
// navBar.classList.add("test-class");

//appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
// function styleMobileNav() {
//   navList.parentNode.removeChild(navList);
//   navContainer.appendChild(navList);
//   // mobile burger and menu
//   if (!hasClickListener) {
//     burger.addEventListener("click", () => {
//       mobileModule.toggleNavClasses();
//       navElements.forEach((navEl, index) => {
//         navEl.style.animationDelay = `${0.3 + index / 15.5}s`;
//         navEl.classList.toggle("nav-link-anim");
//         navEl.classList.toggle("invisible");
//       });
//     });
//   }
//   hasClickListener = true;
// }

// // adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu). Small and Large screens.
// function toggleNavClasses() {
//   // let scrolledY;
//   scrolledY = siteWrapper.scrollTop;
//   if (scrolledY > 0) {
//     // console.log("togglea en el toggle");
//     // navBar.classList.toggle("nav-white");
//     navBlack.classList.toggle("navigation-black");
//     nav.classList.toggle("nav-no-border");
//     // navWhite.classList.toggle("navigation-white");
//     // navBar.classList.toggle("nav-back");
//   }
//   if (isIos === false) {
//     siteWrapper.classList.toggle("menu-open");
//   } else {
//     siteWrapper.classList.toggle("menu-open-i");
//   }
//   burger.classList.toggle("cross");
//   navList.classList.toggle("open");
//   navList.classList.add("visible");
//   navContainer.classList.toggle("translate");
//   navImg.classList.toggle("logo-index");
//   heroText.classList.toggle("hero-text-opacity");
//   // svgBackground.classList.toggle("svg-opacity");
//   footer.classList.toggle("footer-index");
// }

export { siteWrapper, navBar };

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

// TODO:
// shadows
// Logos and svg background (bottom on mobile)
// when navbar mobile opens, click everywhere to close it.
// see navbar classes on burger click (specially on iphone)
// social network in navbar?
// navbar mobile open bug (z-index) DONE
// bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes) DONE
// burger ontap mobile! (see iphone)
// accesibility svg titles - svg sprite
// inline svg catched?! see css tricks tutorial
// page loader!!
// dynamic text! See youtube programming video!!
// bugs: button focus blue (in chrome),
// green inputs after submit DONE
// in projects-design: if image stretches more than image witdh: repeat: round or size cover
// lazy - loading!
//download swipper only on mobile? conditional script
// caption background color switched (projects-design)
// on select input from contact form BUG! iphone extra swipe
// es modules! bundles!
// svg grunt!
// transpilation, es6 sourcemap
// source map debuggin? just for dev!
// babel vs babelify? Modules? jquery modules? swiper?
// content link ?
// mousedown touch start?
//auto prefixer: prefix animations? maybe extend sass or something? Each keyframe with different prefix!
// bug in height 100% on iphone? check on the net
