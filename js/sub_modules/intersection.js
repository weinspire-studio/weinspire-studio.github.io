// jshint esversion: 6

const svgsArray = document.querySelectorAll(
  "#software-grid .software-container > svg"
);

const videosArray = document.querySelectorAll(
  "#software-grid .software-container > video"
);

function initIntersection() {
  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window
  ) {
    let observer;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    observer = new IntersectionObserver(processEntries, observerOptions);
    svgsArray.forEach((svg) => {
      observer.observe(svg);
    });
  } else {
    svgsArray.forEach((svg) => {
      intersectViewport(svg);
    });
  }
}

function processEntries(entries, observer) {
  entries.forEach((entry) => {
    if (typeof entry.isIntersecting !== "undefined") {
      if (entry.isIntersecting) {
        videosArray.forEach((video) => {
          if (!video.paused) video.pause();
        });
        entry.target.nextElementSibling.play();
        observer.unobserve(entry.target);
      }
    } else if (typeof entry.intersectionRatio !== "undefined") {
      if (entry.intersectionRatio > 0) {
        videosArray.forEach((video) => {
          if (video.playing) video.pause();
        });
        entry.target.nextElementSibling.play();
        observer.unobserve(entry.target);
      }
    }
  });
}

function intersectViewport(element) {
  addEventListener("load", processInterception.bind(null, element));
  addEventListener(
    "scroll",
    processInterception.bind(null, element),
    supportsPassive ? { passive: true } : false
  );
  addEventListener("resize", processInterception.bind(null, element));
}

function processInterception(ele) {
  const { top, bottom } = ele.getBoundingClientRect();
  const vHeight = window.innerHeight || document.documentElement.clientHeight;

  if ((top > 0 || bottom > 0) && top < vHeight) {
    videosArray.forEach((video) => {
      if (video.playing) video.pause();
    });
    ele.nextElementSibling.play();
    removeEventListener("load", processInterception);
    removeEventListener(
      "scroll",
      processInterception,
      supportsPassive ? { passive: true } : false
    );
    removeEventListener("resize", processInterception);
  }
}

export { initIntersection };
