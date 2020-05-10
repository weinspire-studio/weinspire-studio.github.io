// jshint esversion: 6

// TweenLite.defaultEase = Linear.easeNone;
let controller = new ScrollMagic.Controller();
let tl = new TimelineMax();

const svgBg = document.getElementById("svg-background");
console.log(svgBg.firstElementChild);

// document.addEventListener("DOMContentLoaded", () => {
//   const path = document.querySelector("#path-1");
//   const path2 = document.getElementById("#path-1");
//   console.log(path, path2);
// });

var response = "";
$.ajax({
  type: "GET",
  url: "http://www.google.de",
  async: false,
  success: function (text) {
    response = text;
  },
});

console.log(response);
