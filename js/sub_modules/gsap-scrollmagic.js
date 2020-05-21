// jshint esversion: 6

const url = `https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/optimized_ajax/svg-background.svg`;
const url2 = `https://raw.githubusercontent.com/weinspire-studio/weinspire-studio.github.com/master/assets/design.svg`;
const controller = new ScrollMagic.Controller();
const tl = new TimelineMax();
const tl2 = new TimelineMax();
const tl3 = new TimelineMax();
const tl4 = new TimelineMax();

function prepareRequests(isSafari) {
  const sectionBg = document.getElementById("section-background");
  const divContainer = document.getElementById("grid-btm-icon");
  makeRequest(url, sectionBg, animateBackground.bind(null, isSafari));
  makeRequest(url2, divContainer, animateIconDesign);
}

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

function animateBackground(isSafari) {
  const svgPaths = document.querySelectorAll("#svg-background path");
  const heroDivs = document.querySelectorAll("#section-hero .hero");

  tl.to(svgPaths[0], 1, { y: 95, ease: Linear.easeNone }, 0.4)
    .to(svgPaths[1], 1, { y: 175, ease: Linear.easeNone }, 0.2)
    .to(svgPaths[2], 1, { y: 140, ease: Linear.easeNone }, 0.3)
    .to(svgPaths[3], 1, { y: 25, ease: Linear.easeNone }, 0);
  // prettier-ignore
  if(!isSafari) {
      // tl.to(heroDivs[0], 1, { y: "50%", ease: Linear.easeNone }, 0)
      //   .to(heroDivs[1], 1, { y: "50%", ease: Linear.easeNone }, 0);
    }

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
  const iconDesignCircles = document.querySelectorAll("#design circle");
  let pathsArray = Array.prototype.slice.call(iconDesignPaths);
  let circlesArray = Array.prototype.slice.call(iconDesignCircles);

  pathsArray.push.apply(pathsArray, circlesArray);
  pathsArray.forEach((path) => {
    preparePath(path);
  });
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
    triggerHook: 0.75,
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

function animateAssets() {
  zoomHeroDivs();
  animateSvgPaths();
}

function zoomHeroDivs() {
  const heroDivs = document.querySelectorAll("#section-hero .hero");
  tl3
    .from(heroDivs[0], 1.25, { scale: 1.35 })
    .from(heroDivs[1], 1.25, { scale: 1.35 }, 0);
}

function animateSvgPaths() {
  const svgPaths = document.querySelectorAll("#svg-background path");
  // prettier-ignore
  tl4
    .from(svgPaths[0], 1, { opacity: 0, scale: 1.25 }, 0.4)
    .from(svgPaths[1], 1.25, { opacity: 0, scale: 1.25 }, 0.2)
    .from(svgPaths[2], 1.25, { opacity: 0, scaleX: 1.25, scaleY: 0.9, rotation: "1deg" }, 0.3)
    .from(svgPaths[3], 1.5, { opacity: 0, scale: 1.03 }, 0);
}

export { prepareRequests, animateAssets };

// let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");

// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });

// fill="none" stroke="#000000" stroke-width="1"
