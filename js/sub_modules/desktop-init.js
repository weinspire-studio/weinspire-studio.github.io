// jshint esversion: 6

const navBar = document.getElementById("section-navbar");
const navContainer = document.querySelector(".navigation-container");
const nav = document.getElementById("home");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navAnchors = document.querySelectorAll(".nav-list a");
const navShadow = document.querySelector(".navigation-shadow");
const navWhiteBack = document.querySelector(".navigation-white-back");
const flagsContainer = document.getElementById("lang");
const brandDesktop = document.getElementById("brand-desktop-svg");

let hasHoverListener = false;

function desktopInitCode(supportsPassive, debounce) {
  let debouncedNavDesktop;
  setDesktopBrand();
  prepareDesktopNav();
  styleDeskNavOnScroll();
  debouncedNavDesktop = debounce(styleDeskNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener(
    "scroll",
    debouncedNavDesktop,
    supportsPassive ? { passive: true } : false
  );
  return debouncedNavDesktop;
}

function styleDeskNavOnScroll() {
  let scrolledY = window.pageYOffset;
  if (scrolledY !== 0) {
    styleDesktopBrand();
    flagsContainer.classList.add("flag-invisible");
    navBar.classList.add("nav-white");
    navWhiteBack.classList.add("nav-white-back");
    navShadow.classList.add("nav-shadow");
  } else {
    restoreDesktopBrand();
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
    flagsContainer.classList.remove("flag-invisible");
  }
}

function prepareDesktopNav() {
  styleDesktopNav();
  styleAnchorOnHover();
}

// removes flags container from ul and appends it to section-navbar
function styleDesktopNav() {
  const langLink = navList.lastElementChild;
  if (langLink.firstElementChild) {
    const langDiv = langLink.removeChild(langLink.firstElementChild);
    nav.parentElement.appendChild(langDiv);
  }
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

// inits mobile brand svg colors.
function setDesktopBrand() {
  // const brandDesktop = document.getElementById("brand-desktop-svg");
  brandDesktop.classList.add("brand-negative");
}

// changes mobile svg brand colors.
function styleDesktopBrand() {
  // const brandDesktop = document.getElementById("brand-desktop-svg");
  brandDesktop.classList.add("brand-color");
  brandDesktop.classList.remove("brand-negative");
}

// restores mobile svg brand color to init.
function restoreDesktopBrand() {
  // const brandDesktop = document.getElementById("brand-desktop-svg");
  brandDesktop.classList.remove("brand-color");
  brandDesktop.classList.add("brand-negative");
}

function prepareForDesktop(callback) {
  appendCtaDesktop();
  restoreDesktopNav(callback);
}

// called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.
// COMMON DEFER
function restoreDesktopNav(toggleNavClasses) {
  if (navContainer.firstChild !== null) {
    navContainer.removeChild(navList);
    nav.appendChild(navList);
    appendInfoSocial();
  }
  if (navContainer.classList.contains("translate")) {
    toggleNavClasses(true);
    navElements.forEach((navEl) => {
      navEl.style.animationDelay = "";
      navEl.classList.remove("nav-link-anim");
      navEl.classList.remove("invisible");
    });
  }
}

// appends call to action button to desktop landing page, after subtitle.
function appendCtaDesktop() {
  const heroTextContainer = document.querySelector(".hero.hero-text");
  const ctaButton = document.getElementById("hero-cta");
  const ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
  heroTextContainer.appendChild(ctaBtn);
}

// appends social svgs to contact info container COMMON DEFER
function appendInfoSocial() {
  const linkSocial = document.getElementById("link-social");
  const formInfo = document.querySelector(".form-info");
  const socialChild = linkSocial.removeChild(linkSocial.firstElementChild);
  formInfo.appendChild(socialChild);
}

export { desktopInitCode, prepareForDesktop };
