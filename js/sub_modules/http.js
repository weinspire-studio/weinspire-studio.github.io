// jshint esversion: 6

import "../../node_modules/objectFitPolyfill/dist/objectFitPolyfill.basic.min.js";
import "intersection-observer";
import LazyLoad from "vanilla-lazyload";

// https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master
const baseUrl = "/assets/";

function makeRequest(url, section, callback = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        section.appendChild(xhr.responseXML.documentElement);
        if (callback) callback();
      } else console.log("There was a problem with the request.");
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

var lazyLoadInstance = new LazyLoad({
  elements_selector: ".swiper-wrapper img.lazy",
});

function loadHDImages(clickedImage, modalImage, modalCaption) {
  const images = document.querySelectorAll(".swiper-wrapper img");
  let caption = clickedImage.nextElementSibling.nextElementSibling;
  let newSource;
  let h4 = document.createElement("h4");
  let h6 = document.createElement("h6");
  images.forEach((img) => {
    if (img.src === clickedImage.src) {
      newSource = clickedImage.src.replace("-min", "");
      modalImage.src = newSource;
      if (modalCaption.textContent !== "") modalCaption.textContent = "";
      modalCaption.appendChild(h4);
      modalCaption.appendChild(h6);
      modalCaption.firstElementChild.textContent =
        caption.firstElementChild.textContent;
      modalCaption.lastElementChild.textContent =
        caption.lastElementChild.textContent;
      img.src = newSource;
    }
  });
  setTimeout(() => {
    images.forEach((img) => {
      if (img.src !== clickedImage.src) {
        newSource = img.src.replace("-min", "");
        img.src = newSource;
      }
    });
  }, 400);
}

// lazyLoadInstance.update();

objectFitPolyfill();

// function makeRequest2(url, section, callback = null) {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         console.log(xhr);
//         section.appendChild(img);
//         if (callback) {
//           callback();
//         } else {
//           console.log("no call");
//         }
//       } else {
//         console.log("There was a problem with the request.");
//       }
//     }
//   };
//   xhr.open("GET", url);
//   xhr.send();
// }

// function prepareRequests() {
//   const containers = document.querySelectorAll(".content-link");
//   makeRequest2(url, containers[1], testCallback);
// }

// function testCallback() {
//   console.log(document.querySelectorAll(".content-link"));
// }

export { makeRequest, loadHDImages };
