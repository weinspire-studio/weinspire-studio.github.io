// jshint esversion: 6

// TweenLite.defaultEase = Linear.easeNone;
// let controller = new ScrollMagic.Controller();
// let tl = new TimelineMax();
const url =
  "https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/svg-background.svg";
const url2 =
  "https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/optimized/design.svg";
const sectionBg = document.getElementById("section-background");

const controller = new ScrollMagic.Controller();
let tl = new TimelineMax();

let xhr = new XMLHttpRequest();
let parser = new DOMParser();

xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");
      let svg = xmlDoc.documentElement;
      sectionBg.append(svg);
      animateBackground();
    } else {
      alert("There was a problem with the request.");
    }
  }
};
xhr.open("GET", url);
xhr.send();

function animateBackground() {
  const svgNode = document.getElementById("svg-background");
  const svgPaths = document.querySelectorAll("#svg-background path");
  const heroDivs = document.querySelectorAll("#section-hero .hero");
  console.log(heroDivs);
  console.log(svgNode);
  console.log(svgPaths[0]);
  // tl.to(sectionBg, 1, { y: 120, ease: Linear.easeNone })
  tl.to(svgPaths[5], 1, { y: 80, ease: Linear.easeNone }, 0)
    .to(svgPaths[6], 1, { y: 140, ease: Linear.easeNone }, 0)
    .to(svgPaths[4], 1, { y: 135, ease: Linear.easeNone }, 0)
    .to(svgPaths[2], 1, { y: 25, ease: Linear.easeNone }, 0)
    .to(heroDivs[0], 1, { y: "50%", ease: Linear.easeNone }, 0)
    .to(heroDivs[1], 1, { y: "50%", ease: Linear.easeNone }, 0);
  // .to(svgPaths[8], 1, { y: -100, ease: Linear.easeNone }, 0.6)
  // .to(svgPaths[3], 1, { y: 60, ease: Linear.easeNone }, 0.8)
  // .to(svgPaths[7], 1, { y: -100, ease: Linear.easeNone }, 0.8);
  const ParallaxScene = new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0,
    duration: "100%",
  })
    .setTween(tl)
    .addIndicators()
    .addTo(controller);
}

const iconDesign = document.querySelectorAll(".icon-design path");
console.log(iconDesign);

let tl2 = new TimelineMax();
// tl2.to(, 1, {}, 0);
const drawScene = new ScrollMagic.Scene({
  triggerElement: iconDesign,
  triggerHook: 1,
  duration: "65%",
})
  .addIndicators()
  .addTo(controller);

// const svg = document.getElementById("svg-background");
// console.log(svg);

// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });
