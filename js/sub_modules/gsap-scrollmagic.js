// jshint esversion: 6

import { makeRequest } from "../sub_modules/http";
import debounce from "lodash/debounce";

const url = "/assets/optimized/";
const targets = [
  "svg-background.svg",
  "design.svg",
  "software.svg",
  "marketing.svg",
];

let i = 0;

const controller = new ScrollMagic.Controller();
const tl = gsap.timeline();
const tl2 = gsap.timeline();
const tl3 = gsap.timeline();
const tl4 = gsap.timeline();
const tl5 = gsap.timeline();
const tl6 = gsap.timeline();

function prepareRequests() {
  const sectionBg = document.getElementById("section-background");
  const designContainer = document.getElementById("grid-btm-icon");
  const softwareContainer = document.getElementById("grid-mid-icon");
  const marketingContainer = document.getElementById("grid-top-icon");
  let debouncedTest = debounce(animateBackground, 200, {
    leading: true,
    trailing: true,
  });
  let debouncedTest2 = debounce(animateIconDesign, 200, {
    leading: true,
    trailing: true,
  });
  makeRequest(url + targets[0], sectionBg, debouncedTest);
  makeRequest(url + targets[1], designContainer, debouncedTest2);
  makeRequest(url + targets[2], softwareContainer, animateIconSoftware);
  makeRequest(url + targets[3], marketingContainer, animateIconMarketing);
}

function animateBackground() {
  const svgPaths = document.querySelectorAll("#svg-background path");

  // svgPaths[4].style =
  //   "-webkit-filter: drop-shadow(0px -2px 5px rgba(107, 124, 141, .65));";

  tl.to(svgPaths[0], 1, { y: 95, ease: Linear.easeNone }, 0.4)
    .to(svgPaths[1], 1, { y: 175, ease: Linear.easeNone }, 0.2)
    .to(svgPaths[2], 1, { y: 140, ease: Linear.easeNone }, 0.3)
    .to(svgPaths[3], 1, { y: 25, ease: Linear.easeNone }, 0);

  const ParallaxScene = new ScrollMagic.Scene({
    // triggerElement: this,
    triggerHook: 0,
    duration: "100%",
    // tweenChanges: true,
  })
    .setTween(tl)
    .addTo(controller);
}

function animateIconDesign() {
  const iconDesign = document.getElementById("design");
  const iconDesignPaths = document.querySelectorAll("#design path");

  let pathsArray = Array.prototype.slice.call(iconDesignPaths);
  pathsArray.forEach((path) => {
    preparePath(path);
  });
  let bluePathsArray = [];
  let greenPathsArray = [];

  bluePathsArray.push(
    pathsArray[0],
    pathsArray[3],
    pathsArray[4],
    pathsArray[6],
    pathsArray[7],
    pathsArray[8],
    pathsArray[10]
  );

  greenPathsArray.push(
    pathsArray[1],
    pathsArray[2],
    pathsArray[5],
    pathsArray[9],
    pathsArray[11],
    pathsArray[12]
  );

  // prettier-ignore
  tl2
    .to(pathsArray[0], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // big sq blue
    .to(pathsArray[1], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // big sq green 
    .to(pathsArray[2], 0.3, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // sm sq green
    .to(pathsArray[3], 0.7, { strokeDashoffset: 0, ease: Linear.easeNone }, ">") // sm sq blue
    .to(pathsArray[4], 0.8, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.35) // rect out blue 
    .to(pathsArray[5], 0.8, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.15) // rect in green
    .to(pathsArray[6], 0.4, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.1) // tri blue
    .to(pathsArray[7], 0.3, { strokeDashoffset: 0, ease: Linear.easeNone }, ">") // tri blue
    .to(pathsArray[8], 0.2, { strokeDashoffset: 0, ease: Linear.easeNone }, ">") // tri blue
    .to(pathsArray[10], 0.4, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.1) // pn front green
    .to(pathsArray[9], 1.2, { strokeDashoffset: 0, ease: Linear.easeNone }, ">-0.2") // pn out blue
    .to(pathsArray[11], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, "<") // pn line green
    .to(pathsArray[12], 0.3, { strokeDashoffset: 0, ease: Linear.easeNone }, "<") // pn dot green
    .to(bluePathsArray, 1.1, { stroke: "#33629c", ease: Linear.easeNone }, 0)
    .to(greenPathsArray, 1.1, { stroke: "#009889", ease: Linear.easeNone }, 0);
  const drawScene = new ScrollMagic.Scene({
    triggerElement: iconDesign,
    triggerHook: 1,
    duration: "98%",
    // tweenChanges: true,
  })
    .setTween(tl2)
    .addTo(controller);
}

function animateIconSoftware() {
  const iconSoftware = document.getElementById("software");
  const iconSoftwarePaths = document.querySelectorAll("#software path");

  let pathsArray = Array.prototype.slice.call(iconSoftwarePaths);
  pathsArray.forEach((path) => {
    preparePath(path);
  });
  let bluePathsArray = [];
  let greenPathsArray = [];

  bluePathsArray.push(
    pathsArray[0],
    pathsArray[1],
    pathsArray[4],
    pathsArray[6],
    pathsArray[8],
    pathsArray[9],
    pathsArray[10],
    pathsArray[11],
    pathsArray[13],
    pathsArray[14],
    pathsArray[15],
    pathsArray[17]
  );
  greenPathsArray.push(
    pathsArray[2],
    pathsArray[3],
    pathsArray[5],
    pathsArray[7],
    pathsArray[12],
    pathsArray[16]
  );

  // prettier-ignore
  tl5
    .to(pathsArray[0], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //monitor out blue
    .to(pathsArray[1], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //monitor in blue
    .to(pathsArray[2], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //monitor rect up green
    .to(pathsArray[3], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor youtube out green
    .to(pathsArray[4], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //tablet out blue
    .to(pathsArray[5], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor right square green
    .to(pathsArray[6], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor mouse blue
    .to(pathsArray[7], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor text green
    .to(pathsArray[8], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // cell out blue
    .to(pathsArray[9], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor youtube out blue
    .to(pathsArray[10], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // monitor youtube in blue
    .to(pathsArray[11], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) // tablet in blue
    .to(pathsArray[12], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) // tablet imgs green
    .to(pathsArray[13], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)// tablet text blue
    .to(pathsArray[14], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)// tablet text blue
    .to(pathsArray[15], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)// cell in blue
    .to(pathsArray[16], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)// cell imgs green
    .to(pathsArray[17], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)// cell text blue
    .to(bluePathsArray, 2, { stroke: "#33629c", ease: Linear.easeNone }, 0)
    .to(greenPathsArray, 2, { stroke: "#009889", ease: Linear.easeNone }, 0);
  // .to(greenPathsArray, 1, { stroke: "#33629c", ease: Linear.easeNone }, 0);
  const drawScene = new ScrollMagic.Scene({
    triggerElement: iconSoftware,
    triggerHook: 1,
    duration: "75%",
    // tweenChanges: true,
  })
    .setTween(tl5)
    .addTo(controller);
}

function animateIconMarketing() {
  const iconMarketing = document.getElementById("marketing");
  const iconMarketingPaths = document.querySelectorAll("#marketing path");

  let pathsArray = Array.prototype.slice.call(iconMarketingPaths);
  pathsArray.forEach((path) => {
    preparePath(path);
  });
  let bluePathsArray = [];
  let greenPathsArray = [];

  bluePathsArray.push(
    pathsArray[0],
    pathsArray[1],
    pathsArray[2],
    pathsArray[3],
    pathsArray[8],
    pathsArray[9],
    pathsArray[10],
    pathsArray[11],
    pathsArray[14],
    pathsArray[16],
    pathsArray[17]
  );
  greenPathsArray.push(
    pathsArray[4],
    pathsArray[5],
    pathsArray[6],
    pathsArray[7],
    pathsArray[12],
    pathsArray[13],
    pathsArray[15]
  );

  // prettier-ignore
  tl6
    .to(pathsArray[0], 2.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //blue
    .to(pathsArray[1], 2.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //blue
    .to(pathsArray[2], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 1) //blue
    .to(pathsArray[3], 1.75, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[4], 0.6, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.3) //green
    .to(pathsArray[5], 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }, ">") //green
    .to(pathsArray[6], 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }, ">") //green
    .to(pathsArray[7], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //green
    .to(pathsArray[8], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[9], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[10], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[11], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[12], 1.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //green
    .to(pathsArray[13], 1.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //green
    .to(pathsArray[14], 1.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //blue
    .to(pathsArray[15], 1.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5) //green
    .to(pathsArray[16], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(pathsArray[17], 2, { strokeDashoffset: 0, ease: Linear.easeNone }, 0) //blue
    .to(bluePathsArray, 2, { stroke: "#33629c", ease: Linear.easeNone }, 0)
    .to(greenPathsArray, 2, { stroke: "#009889", ease: Linear.easeNone }, 0);

  const drawScene = new ScrollMagic.Scene({
    triggerElement: iconMarketing,
    triggerHook: 1,
    duration: "92.5%",
    // tweenChanges: true,
  })
    .setTween(tl6)
    .addTo(controller);
}

function preparePath(path) {
  let pathLength = path.getTotalLength();
  path.style.strokeDashoffset = pathLength;
  path.style.strokeDasharray = pathLength;
}

function animateAssets() {
  zoomHeroDivs();
  animateSvgPaths();
}

function zoomHeroDivs() {
  const heroDivs = document.querySelectorAll("#section-hero .hero");
  tl3
    .from(heroDivs[0], 1.25, { scale: 1.25 })
    .from(heroDivs[1], 1.25, { scale: 1.15 }, 0);
}

function animateSvgPaths() {
  const svgPaths = document.querySelectorAll("#svg-background path");
  //   .from(svgPaths[0], 1, { opacity: 0, scale: 1.25 }, 0.4)
  //   .from(svgPaths[1], 1.25, { opacity: 0, scale: 1.25 }, 0.2)
  //   .from(svgPaths[2], 1.25, { opacity: 0, scaleX: 1.25, scaleY: 0.9, rotation: "1deg" }, 0.3)
  //   .from(svgPaths[3], 1.5, { opacity: 0, scale: 1.03 }, 0);
  tl4
    .from(svgPaths[0], { opacity: 0, duration: 2 }, 1)
    .from(svgPaths[1], { opacity: 0, duration: 2 }, 0.4)
    .from(svgPaths[2], { opacity: 0, duration: 2 }, 0.7)
    .from(svgPaths[3], { opacity: 0, duration: 2 }, 0);
}

function slideAnim(direction) {
  const tl = gsap.timeline();
  let xDirFrom, xDirTo, rotationFrom, rotationTo;
  if (direction === "left") {
    xDirFrom = 100;
    xDirTo = -200;
    rotationFrom = 20;
    rotationTo = 0;
  } else {
    xDirFrom = -200;
    xDirTo = 200;
    rotationFrom = -20;
    rotationTo = 0;
  }
  tl.fromTo(
    ".modal-overlay",
    2.1,
    {
      rotation: rotationFrom,
      scaleX: 2,
      scaleY: 200,
      xPercent: xDirFrom,
      yPercent: 0,
      opacity: 1,
      transformOrigin: "0% 0%",
    },
    {
      rotation: rotationTo,
      xPercent: xDirTo,
      yPercent: 0,
      transformOrigin: "50% 50%",
      ease: Power2.easeOut,
    }
  );
}

export { prepareRequests, animateAssets, slideAnim };

// let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");

// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });

// fill="none" stroke="#000000" stroke-width="1"
