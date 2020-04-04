// jshint esversion: 6

// import Swiper from "swiper";
import "../../node_custom_modules/swiper/css/swiper.min.css";
import {
  Swiper,
  EffectCube,
  Pagination
} from "../../node_custom_modules/swiper/js/swiper.esm.js";

Swiper.use([EffectCube, Pagination]);

var defineSwiper = function() {
  let swiper = new Swiper(".swiper-container", {
    init: false,
    // pagination: ".swiper-pagination",
    // slidesPerView: "auto",
    // paginationClickable: true,
    // spaceBetween: 0
    effect: "cube",
    keyboardControl: true,
    mousewheelControl: true,
    // loop: true,
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true
      // shadowOffset: 20,
      // shadowScale: 0.94
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets"
    }
    // navigation: {
    //   nextEl: ".swiper-button-next2",
    //   prevEl: ".swiper-button-prev2"
    // }
    // watchOverflow: false
  });
  return swiper;
};

export { defineSwiper };
