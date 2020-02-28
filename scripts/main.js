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
const notMobileScreenMQ = window.matchMedia("(min-width: 801px)");
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

//adds listener that executes when screen width changes (passing by 801px).
notMobileScreenMQ.addListener(() => {
  if (notMobileScreenMQ.matches) {
    largeScreenCode();
  } else {
    smallScreenCode();
  }
});

//FUNCTIONS
//code that executes only in desktop and tablet screens (> 801px).
function largeScreenCode() {
  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }
  restoreDesktopNav();
  styleAnchorOnHover();
}

//code that executes only in cellphone screens (< 801px).
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
    navElements.forEach(navEl => {
      navEl.style.animationDelay = "";
      navEl.classList.remove("nav-link-anim");
      navEl.classList.remove("invisible");
    });
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

window.addEventListener("DOMContentLoaded", function() {
  // get the form elements defined in your form HTML above

  let form = document.getElementById("contact-form");
  let formButton = document.getElementById("contact-form-button");
  let formStatus = document.getElementById("contact-form-status");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    formButton.classList.remove("button-active");
    formButton.classList.add("button-inactive");
    formButton.classList.add("disabled");
    formStatus.innerHTML =
      "Thank you for your message! We will get in touch with you as soon as possible.";
    showMessage();
  }

  function error() {
    formStatus.innerHTML =
      "We are sorry! The message could not be sent, please try again. If the problem persists, you can reach to us by our social networks!";
    showMessage();
  }

  // handle the form submission event
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = new FormData(form);
    if (!formButton.classList.contains("disabled")) {
      ajax(form.method, form.action, data, success, error);
    }
  });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

function validateForm() {
  const inputs = document.querySelectorAll(".field input");
  const textArea = document.querySelector(".field textarea");
  const formButton = document.getElementById("contact-form-button");
  let formElements = Array.prototype.slice.call(inputs);
  formElements.push(textArea);
  let validName = false;
  let validEmail = false;
  let validText = true;

  // TODO: reset textarea in largeScreenCode (not adding a new listener)
  window.addEventListener("DOMContentLoaded", () => {
    textArea.value = "";
    // formElements.forEach(formEl => {
    //   formEl.setCustomValidity("");
    // });
  });

  formElements.forEach(formEl => {
    let visitedFlag = false;
    formEl.addEventListener("keyup", () => {
      let formElType = formEl.dataset.type;
      if (formElType === "name") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validName = validateName(formEl);
          if (validName) {
            formEl.classList.remove("input-error");
            formEl.classList.add("input-correct");
          } else {
            formEl.classList.remove("input-correct");
            formEl.classList.add("input-error");
          }
        }
      }
      if (formElType === "email") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validEmail = validateEmail(formEl);
          if (validEmail) {
            formEl.classList.remove("input-error");
            formEl.classList.remove("input-error-email");
            formEl.classList.add("input-correct");
          } else {
            formEl.classList.add("input-error");
            formEl.classList.add("input-error-email");
            formEl.classList.remove("input-correct");
          }
        }
      }
      if (formElType === "text") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validText = validateText(formEl);
          if (validText) {
            formEl.classList.add("input-correct");
            formEl.classList.remove("input-error");
          } else {
            formEl.classList.add("input-error");
            formEl.classList.remove("input-correct");
          }
        }
      }
      if (validName && validEmail && validText) {
        formButton.classList.add("button-shake");
        formButton.classList.add("button-active");
        formButton.classList.remove("button-inactive");
        formButton.classList.remove("disabled");
      } else {
        formButton.classList.add("disabled");
        formButton.classList.add("button-inactive");
        formButton.classList.remove("button-active");
        formButton.classList.remove("button-shake");
      }
    });
  });
}

validateForm();

function validateName(element) {
  if (
    element.value.length < 1 ||
    element.value.length > 50 ||
    !element.value.replace(/\s+/g, "").length
  ) {
    return false;
  }
  return true;
}

function validateEmail(element) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value) &&
    element.value.length < 50
  ) {
    return true;
  }
  return false;
}

function validateText(element) {
  if (element.value.length > 300) {
    return false;
  }
  return true;
}

function showMessage() {
  // const message = document.querySelector(".form-fields .field-message");
  const message = document.querySelector(".field-status");
  message.classList.toggle("visible");

  setTimeout(() => {
    message.classList.toggle("visible");
  }, 8000);
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

// TODO:

// shadows
// navbar mobile open bug (z-index)
// bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes)
// Logos and svg background (bottom on mobile)
// check if elses (reduce them)
// when navbar mobile opens, click everywhere to close it.
// accesibility svg titles - svg sprite
// inline svg catched?! see css tricks tutorial
// grunt?
// page loader!!
// dynamic text! See youtube programming video!!
// social network in navbar?
