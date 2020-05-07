// jshint esversion: 6

import {
  nav,
  navList,
  navElements,
  navContainer,
  toggleNavClasses,
} from "./mobile.js";

const navAnchors = document.querySelectorAll(".nav-list a");
const brandDesktop = document.querySelector("#brand-desktop-svg");
const list = document.querySelector(".swiper-wrapper");
const links = document.querySelectorAll(".swiper-slide");
let hasHoverListener = false;

// animation effect (underline) for desktop nav anchors.
function styleAnchorOnHover() {
  if (!hasHoverListener) {
    navAnchors.forEach((anchor) => {
      anchor.addEventListener("mouseover", function () {
        let scrolledY = window.pageYOffset;
        if (scrolledY === 0) {
          anchor.classList.remove("anchor-white");
          anchor.classList.remove("underline-black");
          anchor.classList.add("underline-white");
        } else {
          anchor.classList.add("anchor-white");
          anchor.classList.add("underline-black");
          anchor.classList.remove("underline-white");
        }
        let property = {
          selector: "width",
        };
        property.value = `${(anchor.offsetWidth + 5) / 2}` + `px`;
        editStyle(".nav-list a", property);
      });
    });
  }
  hasHoverListener = true;
}

// called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.
function restoreDesktopNav() {
  if (navContainer.firstChild !== null) {
    navContainer.removeChild(navList);
    nav.appendChild(navList);
  }
  if (navContainer.classList.contains("translate")) {
    toggleNavClasses();
    navElements.forEach((navEl) => {
      navEl.style.animationDelay = "";
      navEl.classList.remove("nav-link-anim");
      navEl.classList.remove("invisible");
    });
  }
}

//adds a custom property to an existing pseudo-class. Used to define width of underlines, according to nav anchors length.
function editStyle(className, property) {
  let sheet = document.styleSheets[0];
  let sheetLength = sheet.cssRules.length || sheet.rules.length;
  let classes = sheet.rules || sheet.cssRules;
  for (let x = 0; x < classes.length; x++) {
    if (classes[x].selectorText == className) {
      sheet.insertRule(
        `${className}:hover:before { ${property.selector}: ${property.value}; }`,
        sheetLength
      );
      sheet.insertRule(
        `${className}:hover:after { ${property.selector}: ${property.value}; }`,
        sheetLength
      );
    }
  }
}

function animateImagesSafari() {
  list.addEventListener("mouseover", styleLink);
  list.addEventListener("mouseleave", restoreLink);
}

function styleLink() {
  links.forEach((link) => {
    if (link.matches(":hover")) {
      // console.log(link.id);
      link.style.width = "36%";
      // console.log(link);
      link.classList.add("overlay-transparent");
      link.firstElementChild.nextElementSibling.classList.add("show-caption");
    } else {
      link.style.width = "18%";
      link.classList.remove("overlay-transparent");
      link.firstElementChild.nextElementSibling.classList.remove(
        "show-caption"
      );
    }
  });
}

function restoreLink() {
  links.forEach((link) => {
    link.style.width = "20%";
    link.classList.remove("overlay-transparent");
    link.firstElementChild.nextElementSibling.classList.remove("show-caption");
  });
}

function removeImagesListeners() {
  list.removeEventListener("mouseover", styleLink);
  list.removeEventListener("mouseleave", restoreLink);
}

// changes mobile svg brand colors.
function styleDesktopBrand() {
  brandDesktop.classList.add("brand-color");
  brandDesktop.classList.remove("brand-negative");
}

// restores mobile svg brand color to init.
function restoreDesktopBrand() {
  brandDesktop.classList.remove("brand-color");
  brandDesktop.classList.add("brand-negative");
  // console.log("a mime llaman");
}

// inits mobile brand svg colors.
function setDesktopBrand() {
  brandDesktop.classList.add("brand-negative");
  if (brandDesktop.style.display === "none") {
    brandDesktop.style.display = "initial";
  }
}
// inits mobile brand svg colors.
function unsetDesktopBrand() {
  brandDesktop.style.display = "none";
}

export {
  restoreDesktopNav,
  styleAnchorOnHover,
  styleDesktopBrand,
  restoreDesktopBrand,
  setDesktopBrand,
  unsetDesktopBrand,
  animateImagesSafari,
  removeImagesListeners,
};
