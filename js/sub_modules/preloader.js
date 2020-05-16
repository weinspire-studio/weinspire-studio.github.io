// jshint esversion: 6

import { animateAssets } from "../sub_modules/gsap-scrollmagic";

const preloader = document.getElementById("preloader");
const preloaderContainer = document.getElementById("preloader-container");

window.addEventListener("load", hidePreloader);

function hidePreloader() {
  preloaderContainer.classList.add("fade-preloader");
  preloaderContainer.addEventListener("animationend", slidePreloader);
}

function slidePreloader() {
  preloader.classList.add("translate-preloader");
  removeListeners();
  animateAssets();
  let timer = setTimeout(() => {
    preloader.style.display = "none";
    clearTimeout(timer);
  }, 1000);
}

function removeListeners() {
  window.removeEventListener("load", hidePreloader);
  preloaderContainer.removeEventListener("animationend", slidePreloader);
}
