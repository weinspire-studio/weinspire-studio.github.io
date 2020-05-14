// jshint esversion: 6

const preloader = document.getElementById("preloader");
const preloaderContainer = document.getElementById("preloader-container");

window.addEventListener("load", () => {
  //   $("#preloader").fadeOut();
  hidePreloader();
});

function hidePreloader() {
  //   $("#preloader-container").fadeOut();
  preloaderContainer.classList.add("fade-preloader");
  setTimeout(slidePreloader, 1100);
}

function slidePreloader() {
  console.log("slide");
  preloader.classList.add("translate-preloader");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
}
