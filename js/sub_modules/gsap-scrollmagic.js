// jshint esversion: 6

// TweenLite.defaultEase = Linear.easeNone;
let controller = new ScrollMagic.Controller();
let tl = new TimelineMax();
const url =
  "https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/svg-background.svg";
const sectionBg = document.getElementById("section-background");

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");
      let svg = xmlDoc.documentElement;
      sectionBg.append(svg);
    } else {
      alert("There was a problem with the request.");
    }
  }
};
xhr.open("GET", url);
xhr.send();

// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });
