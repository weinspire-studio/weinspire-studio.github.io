// variables definition
const siteWrapper = document.querySelector("#site-wrapper");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const nav = document.querySelector("nav");
const navBar = document.querySelector("#navbar");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navImg = document.querySelector("nav img");
const navContainer = document.querySelector(".navigation-container");
const navWhite = document.querySelector(".navigation-color-white");
const navBlack = document.querySelector(".navigation-overlay-black");
const heroText = document.querySelector(".hero-text");
const footer = document.querySelector("#footer");
const svgArrow = document.querySelector("#footer #up-arrow");
const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");
// const svgBackground = document.querySelector("#svg-background");
// const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");

let hasScrollListener = false;
let hasClickListener = false;

// jQuery for animated scroll
$("#up-arrow").on("click", function() {
  const siteWrapperTop = $("#site-wrapper").position().top;
  $("#site-wrapper").animate(
    {
      scrollTop: siteWrapperTop
    },
    750
  );
});

//on pageload, executes the following code, depending on screen width.
if (notMobileScreenMQ.matches) {
  largeScreenCode();
} else {
  smallScreenCode();
}

//adds listener that executes when screen width changes (passing by 1024px)
notMobileScreenMQ.addListener(() => {
  if (notMobileScreenMQ.matches) {
    largeScreenCode();
  } else {
    smallScreenCode();
  }
});

function largeScreenCode() {
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }
  // console.log("large screen code");
  restoreDesktopNav();
}

function smallScreenCode() {
  // console.log("small screen code");
  styleMobileNav();
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasListener = true;
  }
}

function styleNavOnScroll() {
  let scrolledY = siteWrapper.scrollTop;
  scrolledY > 0
    ? (navBar.classList.add("nav-white"), nav.classList.add("nav-no-border"))
    : (navBar.classList.remove("nav-white"),
      nav.classList.remove("nav-no-border"));
}

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

function restoreDesktopNav() {
  // console.log(navContainer);
  if (navContainer.firstChild !== null) {
    navContainer.removeChild(navList);
    nav.appendChild(navList);
  }
  if (siteWrapper.classList.contains("menu-open")) {
    toggleNavClasses();
  }
}

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
  navContainer.classList.toggle("translate");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  // svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
}

//// /////////// /////
// TODO:
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
