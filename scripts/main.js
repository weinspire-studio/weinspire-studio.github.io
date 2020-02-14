// variables definition
const siteWrapper = document.querySelector("#site-wrapper");
const svgBackground = document.querySelector("#svg-background");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const navBar = document.querySelector("#navbar");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navImg = document.querySelector("nav img");
const navDiv = document.querySelector(".navigation");
const nav = document.querySelector("nav");
const heroText = document.querySelector(".hero-text");
const footer = document.querySelector("#footer");
const svgArrow = document.querySelector("#footer #up-arrow");
const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");
// const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");

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

//
let burgerHasListener = false;
let hasListener = false;
//on pageload, executes the following code, depending on screen width.
if (notMobileScreenMQ.matches) {
  // largeScreenCode();
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
  if (!hasListener) {
    siteWrapper.addEventListener("scroll", styleDesktopNav);
    hasListener = true;
  }
  // console.log("large screen code");
  stripDownDesktopNav();
}

function smallScreenCode() {
  // console.log("small screen code");
  animMobileNav();
}

function styleDesktopNav() {
  // let scro = siteWrapper.scrollHeight;
  // console.log("height" + scro);
  // console.log(window.innerHeight);
  let scrolledY = siteWrapper.scrollTop;
  // console.log(scrolledY);
  if (scrolledY > 0) {
    navBar.classList.add("nav-white");
  } else {
    navBar.classList.remove("nav-white");
  }
}

function animMobileNav() {
  navList.parentNode.removeChild(navList);
  navDiv.appendChild(navList);
  // mobile burger and menu
  // TODO: add the listener only on small resolutions
  if (!burgerHasListener) {
    burger.addEventListener("click", () => {
      siteWrapper.classList.toggle("menu-open");
      burger.classList.toggle("cross");
      navList.classList.toggle("open");
      navDiv.classList.toggle("translate");
      navImg.classList.toggle("logo-index");
      heroText.classList.toggle("hero-text-opacity");
      // svgBackground.classList.toggle("svg-opacity");
      footer.classList.toggle("footer-index");
      navElements.forEach((navEl, index) => {
        navEl.style.animationDelay = `${0.3 + index / 15.5}s`;
        navEl.classList.toggle("nav-link-anim");
        navEl.classList.toggle("invisible");
      });
    });
    console.log("se le puso el listener");
  }
  burgerHasListener = true;
}

function stripDownDesktopNav() {
  // console.log(navDiv);
  navDiv.removeChild(navList);
  nav.appendChild(navList);
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
