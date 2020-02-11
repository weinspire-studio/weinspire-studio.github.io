// variables definition
const siteContainer = document.querySelector("#site-container");
const svgBackground = document.querySelector("#svg-background");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navImg = document.querySelector("nav img");

// mobile burger and menu
burger.addEventListener("click", () => {
  navList.classList.toggle("open");
  burger.classList.toggle("cross");
  document.body.classList.toggle("menu-open");
  svgBackground.classList.toggle("svg-opacity");
  navImg.classList.toggle("logo-index");
  navElements.forEach((navEl, index) => {
    navEl.style.animationDelay = `${0.05 + index / 12.5}s`;
    navEl.classList.toggle("nav-link-anim");
    navEl.classList.toggle("invisible");
  });
});
