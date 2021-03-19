require = (function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    13: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.mobileInitCode = mobileInitCode;
        exports.toggleNavClasses = toggleNavClasses;

        var _jquery = require("../sub_modules/jquery");

        // jshint esversion: 6
        var navBar = document.getElementById("section-navbar");
        var nav = document.getElementById("home");
        var navWhiteBack = document.querySelector(".navigation-white-back");
        var navShadow = document.querySelector(".navigation-shadow");
        var flagsContainer = document.getElementById("lang");
        var brandMobile = document.getElementById("brand-mobile-svg");
        var navList = document.querySelector(".nav-list");
        var linkSocial = document.getElementById("link-social");
        var navContainer = document.querySelector(".navigation-container");
        var formInfo = document.querySelector(".form-info");
        var siteOverlay = document.querySelector(".site-overlay");
        var heroImgContainer = document.querySelector(".hero.hero-img");
        var ctaButton = document.getElementById("hero-cta");
        var burger = document.querySelector(".burger");
        var navElements = document.querySelectorAll(".nav-list li");
        var isOpen_Menu = false; //code that executes only in phones and small tablets screens (< 801px).

        function mobileInitCode(supportsPassive, calledBefore, debounce) {
          var debouncedNavMobile;
          setMobileBrand();
          prepareMobileNav();
          if (!calledBefore) styleMobileNav();
          styleMobNavOnScroll();
          appendCtaMobile();
          (0, _jquery.unbindImages)();
          debouncedNavMobile = debounce(styleMobNavOnScroll, 200, {
            leading: true,
            trailing: true,
          });
          window.addEventListener(
            "scroll",
            debouncedNavMobile,
            supportsPassive
              ? {
                  passive: true,
                }
              : false
          );
          return debouncedNavMobile;
        } // appends flags, social svgs and navList to navContainer (because of burger z-index issue)

        function prepareMobileNav() {
          if (nav.nextElementSibling) {
            var langDiv = nav.parentElement.removeChild(nav.nextElementSibling);
            navList.lastElementChild.appendChild(langDiv);
          }

          if (formInfo.lastElementChild) {
            var infoSocial = formInfo.removeChild(formInfo.lastElementChild);
            linkSocial.appendChild(infoSocial);
          }

          navList.parentNode.removeChild(navList);
          navContainer.appendChild(navList);
        } //adds animation to links and click listener to menu burger.

        function styleMobileNav() {
          burger.addEventListener("click", function () {
            toggleNavClasses();
            navElements.forEach(function (navEl, index) {
              navEl.style.animationDelay = "".concat(
                (0.3 + index / 15.5).toFixed(2),
                "s"
              );
              navEl.classList.toggle("nav-link-anim");
              navEl.classList.toggle("invisible");
            });
          });
        } // adds or removes classes to nav and burger, and changes z-index and opacity to elements at the back (for black div when opening menu).

        function toggleNavClasses() {
          var fromDesk =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;
          var scrolledY = window.pageYOffset;

          if (scrolledY > 0) {
            nav.classList.toggle("nav-no-border");
            if (!fromDesk) navBar.classList.toggle("nav-white");

            if (!isOpen_Menu) {
              restoreMobileBrand();
              isOpen_Menu = true;
            } else {
              styleMobileBrand();
              isOpen_Menu = false;
            }
          }

          document.documentElement.classList.toggle("overflow-hidden");
          siteOverlay.classList.toggle("overlay-active");
          navContainer.classList.toggle("translate");
          navList.classList.add("visible");
          navList.classList.toggle("open");
          burger.classList.toggle("cross");
        } //adds or removes classes in order to give white styles to the nav.

        function styleMobNavOnScroll() {
          var scrolledY = window.pageYOffset;

          if (scrolledY !== 0) {
            if (!isOpen_Menu) {
              styleMobileBrand();
              flagsContainer.classList.remove("flag-invisible");
              navBar.classList.add("nav-white");
              navWhiteBack.classList.add("nav-white-back");
              navShadow.classList.add("nav-shadow");
            }
          } else {
            restoreMobileBrand();
            navBar.classList.remove("nav-white");
            navWhiteBack.classList.remove("nav-white-back");
            navShadow.classList.remove("nav-shadow");
            flagsContainer.classList.remove("flag-invisible");
          }
        } // changes mobile svg brand colors.

        function styleMobileBrand() {
          brandMobile.classList.add("brand-color");
          brandMobile.classList.remove("brand-negative");
        } // restores mobile svg brand color to init.

        function restoreMobileBrand() {
          brandMobile.classList.remove("brand-color");
          brandMobile.classList.add("brand-negative");
        } // inits mobile brand svg colors.

        function setMobileBrand() {
          brandMobile.classList.add("brand-negative");
        }

        function appendCtaMobile() {
          var ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
          heroImgContainer.appendChild(ctaBtn);
        }
      },
      { "../sub_modules/jquery": 5 },
    ],
  },
  {},
  [13]
);
