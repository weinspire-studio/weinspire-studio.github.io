// variables definition
const svgBackground = document.querySelector("#svg-background");
const heroText = document.querySelector(".hero-text");
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
  heroText.classList.toggle("hero-text-opacity");
  navImg.classList.toggle("logo-index");
  navElements.forEach((navEl, index) => {
    navEl.style.animationDelay = `${0.05 + index / 12.5}s`;
    navEl.classList.toggle("nav-link-anim");
    navEl.classList.toggle("invisible");
  });
});

$("#up-arrow").on("click", function() {
  const body = $("body").position().top;

  $("body, html").animate(
    {
      scrollTop: body
    },
    1000
  );
});
