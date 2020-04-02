// jshint esversion: 6

import { siteWrapper } from "../main.js";
import {
  // nav,
  // navList,
  navElements,
  // navContainer,
  toggleNavClasses
} from "./mobile_only.js";

const navAnchors = document.querySelectorAll(".nav-list a");
let hasHoverListener = false;

// animation effect (underline) for desktop nav anchors.
function styleAnchorOnHover() {
  if (!hasHoverListener) {
    navAnchors.forEach(anchor => {
      anchor.addEventListener("mouseover", function() {
        let scrolledY = siteWrapper.scrollTop;
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
          selector: "width"
        };
        // property.selector = "width";
        property.value = `${(anchor.offsetWidth + 5) / 2}` + `px`;
        editStyle(".nav-list a", property);
      });
    });
  }
  hasHoverListener = true;
}

// called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.
function restoreDesktopNav() {
  // if (navContainer.firstChild !== null) {
  // navContainer.removeChild(navList);
  // nav.appendChild(navList);
  // }
  if (siteWrapper.classList.contains("menu-open")) {
    toggleNavClasses();
    navElements.forEach(navEl => {
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

export { restoreDesktopNav, styleAnchorOnHover };
