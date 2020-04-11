// jshint esversion: 6

import "../../node_custom_modules/swiper/css/swiper.min.css";
import {
  Swiper,
  EffectCube,
  Pagination,
} from "../../node_custom_modules/swiper/js/swiper.esm.js";

Swiper.use([EffectCube, Pagination]);

var defineSwiper = function () {
  let swiper = new Swiper(".swiper-container", {
    init: false,
    effect: "cube",
    keyboardControl: true,
    mousewheelControl: true,
    grabCursor: true,
    // loop: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
  return swiper;
};

export { defineSwiper };
