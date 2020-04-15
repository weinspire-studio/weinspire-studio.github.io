// jshint esversion: 6

import * as mobileModule from "./sub_modules/mobile_only";
import * as desktopModule from "./sub_modules/desktop_only";
import * as swiperModule from "./sub_modules/swiper";
import * as jQueryModule from "./sub_modules/jquery";
import * as contactModule from "./sub_modules/contact";
import debounce from "lodash/debounce";
// import svg4everybody from "./sub_modules/svg4everybody";
// svg4everybody({ polyfill: true });

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// console.log(window);
// console.log(window.NodeList);
// console.log(NodeList.prototype.forEach);

//VARIABLES
const siteWrapper = document.getElementById("site-wrapper");
const navBar = document.getElementById("section-navbar");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const notMobileScreenMQ = window.matchMedia("(min-width: 801px)");
let hasScrollListener = false;
let swiper;

const asd = document.querySelector("#brand-mobile-svg");

init();
initOnWidthChange();
jQueryModule.smoothScroll();
contactModule.validateContactForm();
contactModule.submitContactForm();

//FUNCTIONS
//on pageload, executes the following code, depending on screen width.
function init() {
  if (notMobileScreenMQ.matches) {
    desktopCode();
  } else {
    mobileCode();
  }
}

// adds listener that executes when screen width changes (passing by 801px).
function initOnWidthChange() {
  notMobileScreenMQ.addListener(() => {
    if (notMobileScreenMQ.matches) {
      desktopCode();
    } else {
      mobileCode();
    }
  });
}

//code that executes only in desktop and large tablets screens (> 801px).
function desktopCode() {
  styleNavOnScroll();
  desktopModule.styleAnchorOnHover();
  jQueryModule.animateImages();
  if (!hasScrollListener) {
    siteWrapper.addEventListener(
      "scroll",
      debounce(styleNavOnScroll, 200, { leading: true, trailing: true })
    );
    hasScrollListener = true;
  } else {
    desktopModule.restoreDesktopNav();
  }
  if (swiper && swiper.params.init === true) {
    swiper.destroy();
  }
}

//code that executes only in phones and small tablets screens (< 801px).
function mobileCode() {
  styleNavOnScroll();
  mobileModule.styleMobileNav();
  mobileModule.modifySwiperForIos();
  mobileModule.listenToArrow();
  jQueryModule.unbindImages();
  if (!hasScrollListener) {
    siteWrapper.addEventListener(
      "scroll",
      debounce(styleNavOnScroll, 200, { leading: true, trailing: true })
    );
    hasScrollListener = true;
  }
  swiper = swiperModule.defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();
}

// let asd = document.querySelector("#brand-mobile-svg");
// console.log(asd);

//adds or removes classes in order to give white styles to the nav.
function styleNavOnScroll() {
  let scrolledY = siteWrapper.scrollTop;
  if (scrolledY > 0) {
    // styleMobileBrand();
    navBar.classList.add("nav-white");
    navWhiteBack.classList.add("nav-white-back");
    navShadow.classList.add("nav-shadow");
  } else {
    // restoreMobileBrand();
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
  }
}

// styleMobileBrand();
// changes mobile svg brand colors.
function styleMobileBrand() {
  // let z = document.documentElement.style;
  // z.setProperty("-moz-transition", "all 2s ease");
  // z.setProperty("transition", "2s all 2s ease");
  // // z.transition = "1s all 5s ease";
  // z.setProperty("--letter-w", "skyblue");
  // z.setProperty("--letter-e", "skyblue");
  // z.setProperty("--shape-left", "skyblue");
  // z.setProperty("--shape-right", "skyblue");

  // svg styling! used another approach, jic!
  // let x = getComputedStyle(document.documentElement);
  // let y = x.getPropertyValue("--color-1");

  // let asd = document.querySelector("#brand-mobile-svg");
  // console.log(asd.firstElementChild);

  let sheet = document.styleSheets[0];
  console.log(sheet);
  let classes = sheet.rules || sheet.cssRules;
  classes[23].style.setProperty("--letter-w", "skyblue");
  console.log(classes[23]);
  console.log(asd);
  // let asd = document.querySelector("#brand-mobile-svg");
  // asd.style.setProperty("-moz-transition", "all 5s ease");
  // asd.style.setProperty("transition", "5s all 5s ease");
  asd.style.setProperty("--letter-w", "skyblue");
  asd.style.setProperty("--letter-e", "skyblue");
  asd.style.setProperty("--shape-left", "skyblue");
  asd.style.setProperty("--shape-right", "skyblue");
  // asd.style.setProperty("transition", "all 1s ease");
}

function restoreMobileBrand() {
  let asdd = asd.style.getPropertyValue("--letter-w");
  console.log(asdd);
  asd.style.removeProperty("--letter-w");
  asd.style.removeProperty("--letter-e");
  asd.style.removeProperty("--shape-left");
  asd.style.removeProperty("--shape-right");

  // asd.style.setProperty("--letter-w", "skyblue");
  // if (typeof asd.style.getPropertyValue("height") === "undefined") {
  //   console.log("consolame");
  // }
  // console.log(asd.getPropertyValue("--letter-w"));
}

export { siteWrapper, navBar, debounce };

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
// bug in height 100% on iphone? check on the net (maybe min height in pixels?) (caption due to img from unsplash)

// outline on burger div?
