//VARIABLES
const siteWrapper = document.querySelector("#site-wrapper");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const nav = document.querySelector("nav");
const navImg = document.querySelector("nav img");
const navBar = document.querySelector("#navbar");
const navList = document.querySelector(".nav-list");
const navElements = document.querySelectorAll(".nav-list li");
const navAnchors = document.querySelectorAll(".nav-list a");
const navContainer = document.querySelector(".navigation-container");
const navWhite = document.querySelector(".navigation-color-white");
const navBlack = document.querySelector(".navigation-overlay-black");
const heroText = document.querySelector(".hero-text");
const footer = document.querySelector("#footer");
const svgArrow = document.querySelector("#footer #up-arrow");
const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");
// const svgBackground = document.querySelector("#svg-background");
// const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");

let hasScrollListener = false;
let hasClickListener = false;
let hasHoverListener = false;

// jQuery for animated scroll.
$("#up-arrow").on("click", function() {
  const siteWrapperTop = $("#site-wrapper").position().top;
  $("#site-wrapper").animate(
    {
      scrollTop: siteWrapperTop
    },
    750
  );
});

//on pageload, executes the following code, depending on screen width.
if (notMobileScreenMQ.matches) {
  largeScreenCode();
} else {
  smallScreenCode();
}

//adds listener that executes when screen width changes (passing by 600px).
notMobileScreenMQ.addListener(() => {
  if (notMobileScreenMQ.matches) {
    largeScreenCode();
  } else {
    smallScreenCode();
  }
});

//FUNCTIONS
//code that executes only in desktop and tablet screens (> 600px).
function largeScreenCode() {
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }
  restoreDesktopNav();
  styleAnchorOnHover();
}

//code that executes only in cellphone screens (< 600px).
function smallScreenCode() {
  styleMobileNav();
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasListener = true;
  }
}

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
        let property = new Object();
        property.selector = "width";
        property.value = `${(anchor.offsetWidth + 5) / 2}` + `px`;
        editStyle(".nav-list a", property);
      });
    });
  }
  hasHoverListener = true;
}

//adds or removes classes in order to give white styles to the nav.
function styleNavOnScroll() {
  let scrolledY = siteWrapper.scrollTop;
  scrolledY > 0
    ? (navBar.classList.add("nav-white"), nav.classList.add("nav-no-border"))
    : (navBar.classList.remove("nav-white"),
      nav.classList.remove("nav-no-border"));
}

//appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.
function styleMobileNav() {
  navList.parentNode.removeChild(navList);
  navContainer.appendChild(navList);
  // mobile burger and menu
  if (!hasClickListener) {
    burger.addEventListener("click", () => {
      toggleNavClasses();
      navElements.forEach((navEl, index) => {
        navEl.style.animationDelay = `${0.3 + index / 15.5}s`;
        navEl.classList.toggle("nav-link-anim");
        navEl.classList.toggle("invisible");
      });
    });
  }
  hasClickListener = true;
}

// called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.
function restoreDesktopNav() {
  // console.log(navContainer);
  if (navContainer.firstChild !== null) {
    navContainer.removeChild(navList);
    nav.appendChild(navList);
  }
  if (siteWrapper.classList.contains("menu-open")) {
    toggleNavClasses();
  }
}

// adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu). Small and Large screens.
function toggleNavClasses() {
  let scrolledYMobile;
  scrolledYMobile = siteWrapper.scrollTop;
  if (scrolledYMobile > 0) {
    navBar.classList.toggle("nav-white");
    navBlack.classList.toggle("navigation-black");
    navWhite.classList.toggle("navigation-white");
  }
  siteWrapper.classList.toggle("menu-open");
  burger.classList.toggle("cross");
  navList.classList.toggle("open");
  navContainer.classList.toggle("translate");
  navImg.classList.toggle("logo-index");
  heroText.classList.toggle("hero-text-opacity");
  // svgBackground.classList.toggle("svg-opacity");
  footer.classList.toggle("footer-index");
}

//adds a custom property to an existing pseudo-class, used to define width of underlines, according to nav anchors lenght.
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

//// /////////// /////
// changes the href of a navLink depending on whether the site is in home or in another page.
// const anchorHome = document.querySelector(".nav-home");
// const anchorContact = document.querySelector(".nav-contact");

// console.log(anchorHome);
// console.log(window.location.href);
// console.log(anchorHome.href);

// if (
//   window.location.href === "https://weinspire-studio.github.io/home" ||
//   window.location.href === "https://weinspire-studio.github.io/home/"
// ) {
//   anchorHome.href = "/home/#home";
//   console.log("home");
// }

// function styleDesktopNav() {
// let scro = siteWrapper.scrollHeight;
// console.log("height" + scro);
// console.log(window.innerHeight);
// let scrolledY = siteWrapper.scrollTop;
// console.log(scrolledY);
// }
