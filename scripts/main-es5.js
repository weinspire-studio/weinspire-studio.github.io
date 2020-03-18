"use strict";

// jshint esversion: 6
//VARIABLES
var siteWrapper = document.querySelector("#site-wrapper");
var burger = document.querySelector(".burger");
var lineElements = document.querySelectorAll(".burger div");
var nav = document.querySelector("nav");
var navImg = document.querySelector("nav img");
var navBar = document.querySelector("#navbar");
var navList = document.querySelector(".nav-list");
var navElements = document.querySelectorAll(".nav-list li");
var navAnchors = document.querySelectorAll(".nav-list a");
var navContainer = document.querySelector(".navigation-container");
var navWhite = document.querySelector(".navigation-color-white");
var navBlack = document.querySelector(".navigation-overlay-black");
var heroText = document.querySelector(".hero-text");
var footer = document.querySelector("#footer");
var svgArrow = document.querySelector("#footer #up-arrow");
var notMobileScreenMQ = window.matchMedia("(min-width: 801px)"); // const svgBackground = document.querySelector("#svg-background");
// const notMobileScreenMQ = window.matchMedia("(min-width: 600px)");

var hasScrollListener = false;
var hasClickListener = false;
var hasHoverListener = false;
var hasHoverListenerOnPortolio = false; // let swiper = defineSwiper();

var swiper; // jQuery for animated scroll.

$("#up-arrow").on("click", function () {
  var siteWrapperTop = $("#site-wrapper").position().top;
  $("#site-wrapper").animate({
    scrollTop: siteWrapperTop
  }, 750);
}); //on pageload, executes the following code, depending on screen width.

if (notMobileScreenMQ.matches) {
  largeScreenCode();
} else {
  smallScreenCode();
} //adds listener that executes code when screen width changes (passing by 801px).


notMobileScreenMQ.addListener(function () {
  if (notMobileScreenMQ.matches) {
    largeScreenCode();
  } else {
    smallScreenCode();
  }
}); //FUNCTIONS
//code that executes only in desktop and large tablets screens (> 801px).

function largeScreenCode() {
  styleNavOnScroll();

  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }

  restoreDesktopNav();
  styleAnchorOnHover();
  animateImages();

  if (swiper && swiper.params.init === true) {
    swiper.destroy();
  }
} //code that executes only in phones and small tablets screens (< 801px).


function smallScreenCode() {
  styleNavOnScroll();
  styleMobileNav();

  if (!hasScrollListener) {
    siteWrapper.addEventListener("scroll", styleNavOnScroll);
    hasScrollListener = true;
  }

  if (hasHoverListenerOnPortolio) {
    $("#section-portfolio li").unbind("mouseenter mouseleave");
  }

  swiper = defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();
} // animation effect (underline) for desktop nav anchors.


function styleAnchorOnHover() {
  if (!hasHoverListener) {
    navAnchors.forEach(function (anchor) {
      anchor.addEventListener("mouseover", function () {
        var scrolledY = siteWrapper.scrollTop;

        if (scrolledY === 0) {
          anchor.classList.remove("anchor-white");
          anchor.classList.remove("underline-black");
          anchor.classList.add("underline-white");
        } else {
          anchor.classList.add("anchor-white");
          anchor.classList.add("underline-black");
          anchor.classList.remove("underline-white");
        }

        var property = {
          selector: "width"
        };
        property.selector = "width";
        property.value = "".concat((anchor.offsetWidth + 5) / 2) + "px";
        editStyle(".nav-list a", property);
      });
    });
  }

  hasHoverListener = true;
} //adds or removes classes in order to give white styles to the nav.
// prettier-ignore


function styleNavOnScroll() {
  var scrolledY = siteWrapper.scrollTop;

  if (scrolledY > 0) {
    navBar.classList.add("nav-white");
    nav.classList.add("nav-no-border");
  } else {
    navBar.classList.remove("nav-white");
    nav.classList.remove("nav-no-border");
  }
} //appends navList to navContainer (because of burger z-index issue) and adds click listener to menu burger.


function styleMobileNav() {
  navList.parentNode.removeChild(navList);
  navContainer.appendChild(navList); // mobile burger and menu

  if (!hasClickListener) {
    burger.addEventListener("click", function () {
      toggleNavClasses();
      navElements.forEach(function (navEl, index) {
        navEl.style.animationDelay = "".concat(0.3 + index / 15.5, "s");
        navEl.classList.toggle("nav-link-anim");
        navEl.classList.toggle("invisible");
      });
    });
  }

  hasClickListener = true;
} // called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.


function restoreDesktopNav() {
  // console.log(navContainer);
  if (navContainer.firstChild !== null) {
    navContainer.removeChild(navList);
    nav.appendChild(navList);
  }

  if (siteWrapper.classList.contains("menu-open")) {
    toggleNavClasses();
    navElements.forEach(function (navEl) {
      navEl.style.animationDelay = "";
      navEl.classList.remove("nav-link-anim");
      navEl.classList.remove("invisible");
    });
  }
} // adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu). Small and Large screens.


function toggleNavClasses() {
  var scrolledYMobile;
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
  heroText.classList.toggle("hero-text-opacity"); // svgBackground.classList.toggle("svg-opacity");

  footer.classList.toggle("footer-index");
} //adds a custom property to an existing pseudo-class. Used to define width of underlines, according to nav anchors length.


function editStyle(className, property) {
  var sheet = document.styleSheets[0];
  var sheetLength = sheet.cssRules.length || sheet.rules.length;
  var classes = sheet.rules || sheet.cssRules;

  for (var x = 0; x < classes.length; x++) {
    if (classes[x].selectorText == className) {
      sheet.insertRule("".concat(className, ":hover:before { ").concat(property.selector, ": ").concat(property.value, "; }"), sheetLength);
      sheet.insertRule("".concat(className, ":hover:after { ").concat(property.selector, ": ").concat(property.value, "; }"), sheetLength);
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var formButton = document.getElementById("contact-form-button");
  var inputs = document.querySelectorAll(".field input");
  var textArea = document.querySelector(".field textarea");
  var formElements = Array.prototype.slice.call(inputs);
  var validName = false;
  var validEmail = false;
  var validText = true;
  formElements.push(textArea);
  textArea.value = ""; // handle the form submission event

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);

    if (!formButton.classList.contains("disabled")) {
      ajax(form.method, form.action, data, success, error);
    }
  });
  formElements.forEach(function (formEl) {
    var visitedFlag = false;
    formEl.addEventListener("keyup", function () {
      var formElType = formEl.dataset.type;
      var classes = {
        add: [],
        remove: []
      };

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
            formEl.classList.remove("input-error", "input-error-email");
            formEl.classList.add("input-correct");
          } else {
            formEl.classList.add("input-error", "input-error-email");
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
        formButton.classList.add("button-shake", "button-active");
        formButton.classList.remove("button-inactive", "disabled");
      } else {
        formButton.classList.add("disabled", "button-inactive");
        formButton.classList.remove("button-active", "button-shake");
      }
    });
  }); // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    formElements.forEach(function (formEl) {
      formEl.classList.remove("input-correct");
    });
    formButton.classList.remove("button-active");
    formButton.classList.add("button-inactive");
    formButton.classList.add("disabled");
    formStatus.innerHTML = "Thank you for your message! We will get in touch with you as soon as possible.";
    showMessage();
  }

  function error() {
    formStatus.innerHTML = "We are sorry! The message could not be sent, please try again. If the problem persists, you can reach to us by our social networks!";
    showMessage();
  }
}); // helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };

  xhr.send(data);
}

function validateName(element) {
  if (element.value.length < 1 || element.value.length > 50 || !element.value.replace(/\s+/g, "").length) {
    return false;
  }

  return true;
}

function validateEmail(element) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value) && element.value.length < 50) {
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
  var message = document.querySelector(".field-status");
  message.classList.toggle("visible");
  setTimeout(function () {
    message.classList.toggle("visible");
  }, 8000);
}

function animateImages() {
  $("#section-portfolio li").hover(function () {
    $(this).addClass("expanded");
    $(this).siblings().addClass("contracted");
    $(this).children().last().addClass("show-caption");
  }, function () {
    $(this).removeClass("expanded");
    $(this).siblings().removeClass("contracted");
    $(this).children().last().removeClass("show-caption");
  });
  hasHoverListenerOnPortolio = true;
}

function defineSwiper() {
  swiper = new Swiper(".swiper-container", {
    init: false,
    // pagination: ".swiper-pagination",
    // slidesPerView: "auto",
    // paginationClickable: true,
    // spaceBetween: 0
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true // shadowOffset: 20,
      // shadowScale: 0.94

    },
    pagination: {
      el: ".swiper-pagination"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    } // watchOverflow: false

  });
  return swiper;
} // function initSwiper(swiper) {
//   swiper.init();
// }
// function destroySwiper(swiper) {
//   swiper.destroy();
// }
// var mySwiper = new Swiper(".swiper-container", {
//   // Optional parameters
//   direction: "vertical",
//   loop: true,
//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination"
//   },
//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev"
//   },
//   // And if we need scrollbar
//   scrollbar: {
//     el: ".swiper-scrollbar"
//   }
// });
//
//
// -----------------
// $("#section-portfolio ul").slick({
//   slide: "li"
// });
// $("#section-portfolio ul").slick({
//   autoplay: true,
//   autoplaySpeed: 2000,
//   fade: true,
//   arrows: false
// });
// Plain JS way (portfolio).
// const list = document.querySelectorAll("#section-portfolio li");
// // console.log(list);
// list.forEach(l => {
//   l.addEventListener("mouseover", expand);
//   l.addEventListener("mouseleave", contract);
// });
// list[0].addEventListener("mouseover", () => {
//   console.log("expandedasd");
// });
// function expand() {
//   if (this.nextElementSibling !== null) {
//     this.classList.remove("contracted");
//     this.classList.add("expanded");
//     this.lastElementChild.classList.add("show-caption");
//     let siblings = getAllSiblings(this, this.parentElement);
//     siblings.forEach(el => {
//       el.classList.remove("expanded");
//       el.classList.add("contracted");
//     });
//   }
// }
// function contract() {
//   this.classList.remove("expanded");
//   this.lastElementChild.classList.remove("show-caption");
//   let siblings = getAllSiblings(this, this.parentElement);
//   siblings.forEach(el => {
//     el.classList.remove("contracted");
//   });
// }
// function getAllSiblings(element, parent) {
//   const children = [...parent.children];
//   children.length = 5;
//   return children.filter(child => child !== element);
// }
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
// Logos and svg background (bottom on mobile)
// when navbar mobile opens, click everywhere to close it.
// accesibility svg titles - svg sprite
// inline svg catched?! see css tricks tutorial
// page loader!!
// dynamic text! See youtube programming video!!
// social network in navbar?
// bugs: button focus blue (in chrome),
// navbar mobile open bug (z-index) DONE
// bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes) DONE
// green inputs after submit DONE
// in portfolio: if image stretches more than image witdh: repeat: round or size cover
// lazy - loading!
//download swipper only on mobile? conditional script
// caption background color switched (portfolio)
// on select input from contact form BUG!
//# sourceMappingURL=main-es5.js.map
