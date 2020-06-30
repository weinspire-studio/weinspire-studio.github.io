// jshint esversion: 6

import {
  nav,
  navList,
  navElements,
  navContainer,
  toggleNavClasses,
  appendInfoSocial,
} from "./mobile.js";

import { loadHDImages } from "../sub_modules/http";
import { slideAnim } from "./gsap-scrollmagic.js";

const navAnchors = document.querySelectorAll(".nav-list a");
const brandDesktop = document.querySelector("#brand-desktop-svg");
const list = document.querySelector(".swiper-wrapper");
const links = document.querySelectorAll(".swiper-slide");
let hasHoverListener = false;

function prepareDesktopNav() {
  styleDesktopNav();
  styleAnchorOnHover();
}

// removes flags container from ul and appends it to section-navbar
function styleDesktopNav() {
  const langLink = navList.lastElementChild;
  const langDiv = langLink.removeChild(langLink.firstElementChild);
  nav.parentElement.appendChild(langDiv);
}

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
    appendInfoSocial();
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

function removeImagesListeners() {
  list.removeEventListener("mouseover", styleLink);
  list.removeEventListener("mouseleave", restoreLink);
}

function styleLink() {
  links.forEach((link) => {
    if (link.matches(":hover")) {
      link.style.width = "36%";
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

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
// const cross = document.querySelector("span.close");
const cross = document.getElementById("modal-close");
const leftArrow = document.getElementById("modal-arrow-left");
const rightArrow = document.getElementById("modal-arrow-right");
let hasRequested = false;
let modalOpen = false;

let rightArrowHandler;
let leftArrowHandler;

function initModal() {
  if (!hasRequested) {
    list.addEventListener("click", function showModal(e) {
      let imageTarget;
      modalOpen = true;
      if (e.target.tagName === "DIV") {
        if (e.target.className.indexOf("link-caption") === -1)
          imageTarget = e.target.previousElementSibling;
        else
          imageTarget = e.target.previousElementSibling.previousElementSibling;
      } else if (e.target.tagName === "H4" || e.target.tagName === "H6")
        imageTarget =
          e.target.parentNode.previousElementSibling.previousElementSibling;
      else return;
      loadHDImages(imageTarget, modalImage, modalCaption);
      animateEntry();
      slideImages(imageTarget.parentNode);
    });
    cross.addEventListener("click", modalClose);
    hasRequested = true;
  }
}

function animateEntry() {
  modal.classList.add("visible");
  modalImage.style.animation = "1s emerge-anim";
  modalImage.addEventListener("animationend", () => {
    modalImage.parentNode.style.overflow = "hidden";
  });
  modalCaption.style.animation = "1s caption-emerge-anim";
  cross.classList.add("emerge");
  leftArrow.classList.add("emerge");
  rightArrow.classList.add("emerge");
}

function slideImages(link) {
  if (!link.previousElementSibling) {
    leftArrow.classList.add("not-allowed");
  } else if (!link.nextElementSibling) {
    rightArrow.classList.add("not-allowed");
  }
  leftArrow.addEventListener(
    "click",
    (leftArrowHandler = () => {
      slideAnim("left");
      if (link.previousElementSibling) {
        if (!link.previousElementSibling.previousElementSibling) {
          leftArrow.classList.add("not-allowed");
        } else if (rightArrow.classList.contains("not-allowed"))
          rightArrow.classList.remove("not-allowed");
        link = link.previousElementSibling;
        changeCaption(link);
      }
    })
  );
  rightArrow.addEventListener(
    "click",
    (rightArrowHandler = function () {
      slideAnim("right");
      if (link.nextElementSibling) {
        if (!link.nextElementSibling.nextElementSibling) {
          rightArrow.classList.add("not-allowed");
        } else if (leftArrow.classList.contains("not-allowed"))
          leftArrow.classList.remove("not-allowed");
        link = link.nextElementSibling;
        changeCaption(link);
      }
    })
  );
}

function changeCaption(link) {
  let title;
  let subtitle;
  if (link.lastElementChild.id.indexOf("caption") !== -1) {
    title = link.lastElementChild.firstElementChild;
    subtitle = link.lastElementChild.lastElementChild;
  } else {
    title =
      link.firstElementChild.nextElementSibling.nextElementSibling
        .firstElementChild;
    subtitle =
      link.firstElementChild.nextElementSibling.nextElementSibling
        .lastElementChild;
  }
  setTimeout(() => {
    modalCaption.firstElementChild.textContent = title.textContent;
    modalCaption.lastElementChild.textContent = subtitle.textContent;
    modalImage.src = link.firstElementChild.src;
  }, 300);
}

function modalClose() {
  if (modalOpen) {
    modal.classList.remove("visible");
    cross.classList.remove("emerge");
    leftArrow.classList.remove("emerge", "not-allowed");
    rightArrow.classList.remove("emerge", "not-allowed");
    modalCaption.style.animation = "";
    modalImage.style.animation = "";
    modalImage.parentNode.style.overflow = "visible";
    leftArrow.removeEventListener("click", leftArrowHandler);
    rightArrow.removeEventListener("click", rightArrowHandler);
    modalOpen = false;
  }
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
  prepareDesktopNav,
  styleDesktopBrand,
  restoreDesktopBrand,
  setDesktopBrand,
  unsetDesktopBrand,
  animateImagesSafari,
  removeImagesListeners,
  initModal,
  modalClose,
};
