// jshint esversion: 6

// TweenLite.defaultEase = Linear.easeNone;
const url = `https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/optimized_ajax/svg-background.svg`;
// const url2 = `https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/optimized_ajax/design.svg`;
const url2 = `https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/design.svg`;
const sectionBg = document.getElementById("section-background");
const divContainer = document.getElementById("grid-btm-icon");

const controller = new ScrollMagic.Controller();
const tl = new TimelineMax();

makeRequest(url, sectionBg, animateBackground);
makeRequest(url2, divContainer, animateIconDesign);

function makeRequest(url, section, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        section.append(xhr.responseXML.documentElement);
        callback();
      } else {
        console.log("There was a problem with the request.");
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function animateBackground() {
  // const svgNode = document.getElementById("svg-background");
  const svgPaths = document.querySelectorAll("#svg-background path");
  const heroDivs = document.querySelectorAll("#section-hero .hero");

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

function animateIconDesign() {
  const iconDesign = document.getElementById("design");
  const iconDesignPaths = document.querySelectorAll("#design path");
  const iconDesignCircles = document.querySelectorAll("#design circle");
  console.log(iconDesignCircles);
  console.log(iconDesignPaths);

  let pathsArray = Array.prototype.slice.call(iconDesignPaths);
  let circlesArray = Array.prototype.slice.call(iconDesignCircles);

  pathsArray.push.apply(pathsArray, circlesArray);

  pathsArray.forEach((path) => {
    preparePath(path);
  });

  const tl2 = new TimelineMax();
  // prettier-ignore
  tl2
    .to(pathsArray[0], 1, { strokeDashoffset: 5, ease: Linear.easeNone }, 0)
    .to(pathsArray[1], 1, { strokeDashoffset: 1, ease: Linear.easeNone }, 0)
    .to(pathsArray[2], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)
    .to(pathsArray[3], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)
    .to(pathsArray[4], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)
    .to(pathsArray[5], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)
    .to(pathsArray[6], 1, { strokeDashoffset: 0, ease: Linear.easeNone }, 0)
    .to(pathsArray[7], 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5)
    .to(pathsArray[8], 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5)
    .to(pathsArray[9], 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }, 0.5)
    .to(pathsArray, 1, { stroke: "#33629c", ease: Linear.easeNone }, 0);
  const drawScene = new ScrollMagic.Scene({
    triggerElement: iconDesign,
    triggerHook: 0.5,
    duration: "60%",
    tweenChanges: true,
  })
    .setTween(tl2)
    .addIndicators()
    .addTo(controller);
}

function preparePath(path) {
  let pathLength = path.getTotalLength();
  path.style.strokeDashoffset = pathLength;
  path.style.strokeDasharray = pathLength;
}

// let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");

// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });

// fill="none" stroke="#000000" stroke-width="1"
