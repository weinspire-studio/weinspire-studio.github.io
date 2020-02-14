// variables definition
const svgBackground = document.querySelector("#svg-background");
const heroText = document.querySelector(".hero-text");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navImg = document.querySelector("nav img");
const siteWrapper = document.querySelector("#site-wrapper");
const largeScreenMQ = window.matchMedia("(min-width: 1024px)");
const navBar = document.querySelector("#navbar");
const footer = document.querySelector("#footer");
const svgArrow = document.querySelector("#footer #up-arrow");

// mobile burger and menu
// TODO: add the listener only on small resolutions
burger.addEventListener("click", () => {
  siteWrapper.classList.toggle("menu-open");
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
  navElements.forEach((navEl, index) => {
    navEl.style.animationDelay = `${0.05 + index / 12.5}s`;
    navEl.classList.toggle("nav-link-anim");
    navEl.classList.toggle("invisible");
  });
});

// jQuery for animated scroll
$("#up-arrow").on("click", function() {
  const siteWrapper = $("#site-wrapper").position().top;
  $("#site-wrapper").animate(
    {
      scrollTop: siteWrapper
    },
    750
  );
});

//

let hasListener = false;
//on pageload, executes the following code, depending on screen width.
if (largeScreenMQ.matches) {
  largeScreenCode();
}

// let i = 0;
//adds listener that executes when screen width changes (passing by 1024px)
largeScreenMQ.addListener(() => {
  if (largeScreenMQ.matches) {
    largeScreenCode();
  } else {
    smallScreenCode();
  }

  // console.log(`listener ${i}`);
  // i++;
});

function largeScreenCode() {
  if (!hasListener) {
    siteWrapper.addEventListener("scroll", styleNav);
    hasListener = true;
  }
  console.log("large screen code");
}

function smallScreenCode() {
  console.log("small screen code");
}

function styleNav() {
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
