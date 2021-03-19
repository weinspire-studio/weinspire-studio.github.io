// jshint esversion: 6

import { defineSwiper } from "../sub_modules/swiper";

const designProjectsSection = document.getElementById("section-projects-design"); //prettier-ignore
const rightArrowsContainer = document.querySelector(".right-arrow-container");
const rightArrows = document.querySelectorAll(".right-arrow-container svg");
let designOffset = designProjectsSection.offsetTop;
let clientHeight = document.body.clientHeight;
let debouncedRightArrows;
// UA sniffing
let isIos =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

function mobileDeferCode(isSafari, supportsPassive, debounce) {
  if (!isIos || !isSafari) listenToArrow(supportsPassive, debounce);
  let swiper = defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();
  return swiper;
}

// adds a listener to rightArrowsContainer that triggers the animation.
function listenToArrow(supportsPassive, debounce) {
  debouncedRightArrows = debounce(showRightArrows, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener(
    "scroll",
    showRightArrows.bind(null, supportsPassive),
    supportsPassive ? { passive: true } : false
  );
  rightArrowsContainer.addEventListener(
    "click",
    slideRightArrows.bind(null, supportsPassive)
  );
  rightArrowsContainer.addEventListener(
    "touchmove",
    slideRightArrows.bind(null, supportsPassive),
    supportsPassive ? { passive: true } : false
  );
}

// shows arrows when passing through threshold.
function showRightArrows(supportsPassive) {
  let scrolledY = window.pageYOffset;
  let threshold = designOffset - clientHeight + 300;
  if (scrolledY > threshold) {
    rightArrows.forEach((arrow) => arrow.classList.add("arrow-wave"));
    rightArrows[0].style.animationDelay = "250ms";
    rightArrows[1].style.animationDelay = "125ms";
    setTimeout(function () {
      slideRightArrows(supportsPassive);
    }, 7500);
  }
}

// adds animation to arrow and removes listeners.
function slideRightArrows(supportsPassive) {
  rightArrows.forEach((arrow) => arrow.classList.remove("arrow-wave"));
  rightArrows.forEach((arrow) => arrow.classList.add("arrow-slide"));
  window.removeEventListener(
    "scroll",
    debouncedRightArrows,
    supportsPassive ? { passive: true } : false
  );
  rightArrowsContainer.removeEventListener("click", slideRightArrows);
  rightArrowsContainer.removeEventListener(
    "touchmove",
    slideRightArrows,
    supportsPassive ? { passive: true } : false
  );
}

export { mobileDeferCode, slideRightArrows };
