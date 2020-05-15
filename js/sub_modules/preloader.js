// jshint esversion: 6

const preloader = document.getElementById("preloader");
const preloaderContainer = document.getElementById("preloader-container");

window.addEventListener("load", () => {
  hidePreloader();
});

function hidePreloader() {
  preloaderContainer.classList.add("fade-preloader");
  setTimeout(slidePreloader, 1100);
}

function slidePreloader() {
  preloader.classList.add("translate-preloader");
  document.documentElement.classList.remove("overflow-hidden");
  window.scrollTo(0, 0);
  testFunction();
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
}

function testFunction() {
  const heroDivs = document.querySelectorAll("#section-hero .hero");
  heroDivs.forEach((heroDiv) => {
    heroDiv.classList.add("test-class");
    heroDiv.addEventListener("animationend", () => {
      heroDiv.classList.remove("test-class");
    });
  });
  const svgPaths = document.querySelectorAll("#svg-background path");
  svgPaths.forEach((svgPath) => {
    console.log(svgPath);
    if (
      svgPath.id !== "path-8" &&
      svgPath.id !== "path-3" &&
      svgPath.id !== "path-7"
    ) {
      svgPath.classList.add("test-class-svg");
    } else if (svgPath.id === "path-3") {
      svgPath.classList.add("test-class-svg-2");
    } else if (svgPath.id === "path-7") {
      svgPath.classList.add("test-class-svg-3");
    }
  });
}
