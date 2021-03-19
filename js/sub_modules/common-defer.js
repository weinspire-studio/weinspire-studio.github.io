// jshint esversion: 6

import * as contactModule from "../sub_modules/contact";
import { getUserUbication } from "../sub_modules/location";
import "../../node_modules/objectFitPolyfill/dist/objectFitPolyfill.basic.min.js";
import LazyLoad from "vanilla-lazyload";

function commonDeferInit(isSafari, isIE) {
  contactModule.initContactForms(isSafari, isIE);
  listenToFlags();
}

function listenToFlags() {
  const flagsContainer = document.getElementById("lang");
  let flagsHandler;
  flagsContainer.addEventListener(
    "click",
    (flagsHandler = (e) => {
      styleFlags(e.target);
    })
  );
}

function styleFlags(target) {
  if (target.tagName === "P") {
    if (target.classList.contains("inactive")) {
      target.classList.remove("inactive");
      target.classList.add("active");
      if (target.nextElementSibling) {
        target.nextElementSibling.classList.remove("active");
        target.nextElementSibling.classList.add("inactive");
      } else {
        target.previousElementSibling.classList.remove("active");
        target.previousElementSibling.classList.add("inactive");
      }
    }
  }
}

getUserUbication();
objectFitPolyfill();
const lazyContent = new LazyLoad({
  elements_selector: ".lazy",
  unobserve_entered: true,
});

export { commonDeferInit };
