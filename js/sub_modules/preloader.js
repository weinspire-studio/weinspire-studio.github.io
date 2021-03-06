// jshint esversion: 6

import { animateAssets } from "../sub_modules/animation.js";

const preloader = document.getElementById("preloader");
const preloaderContainer = document.getElementById("preloader-container");

function hidePreloader() {
  preloaderContainer.classList.add("fade-preloader");
  preloaderContainer.addEventListener("animationend", setLanding);
}

function setLanding() {
  slidePreloader();
  animateAssets();
  removeListeners();
}

function slidePreloader() {
  preloader.classList.add("translate-preloader");
  let timer = setTimeout(() => {
    preloader.style.display = "none";
    clearTimeout(timer);
  }, 2000);
}

function removeListeners() {
  window.removeEventListener("load", hidePreloader);
  preloaderContainer.removeEventListener("animationend", setLanding);
}

export { hidePreloader };
