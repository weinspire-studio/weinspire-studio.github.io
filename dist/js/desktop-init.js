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
    11: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.desktopInitCode = desktopInitCode;
        exports.prepareForDesktop = prepareForDesktop;
        // jshint esversion: 6
        var navBar = document.getElementById("section-navbar");
        var navContainer = document.querySelector(".navigation-container");
        var nav = document.getElementById("home");
        var navList = document.querySelector(".nav-list");
        var navElements = document.querySelectorAll(".nav-list li");
        var navAnchors = document.querySelectorAll(".nav-list a");
        var navShadow = document.querySelector(".navigation-shadow");
        var navWhiteBack = document.querySelector(".navigation-white-back");
        var flagsContainer = document.getElementById("lang");
        var brandDesktop = document.getElementById("brand-desktop-svg");
        var hasHoverListener = false;

        function desktopInitCode(supportsPassive, debounce) {
          var debouncedNavDesktop;
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
            supportsPassive
              ? {
                  passive: true,
                }
              : false
          );
          return debouncedNavDesktop;
        }

        function styleDeskNavOnScroll() {
          var scrolledY = window.pageYOffset;

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
        } // removes flags container from ul and appends it to section-navbar

        function styleDesktopNav() {
          var langLink = navList.lastElementChild;

          if (langLink.firstElementChild) {
            var langDiv = langLink.removeChild(langLink.firstElementChild);
            nav.parentElement.appendChild(langDiv);
          }
        } // animation effect (underline) for desktop nav anchors.

        function styleAnchorOnHover() {
          if (!hasHoverListener) {
            navAnchors.forEach(function (anchor) {
              anchor.addEventListener("mouseover", function () {
                var scrolledY = window.pageYOffset;

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
                  selector: "width",
                };
                property.value = "".concat((anchor.offsetWidth + 5) / 2) + "px";
                editStyle(".nav-list a", property);
              });
            });
          }

          hasHoverListener = true;
        } //adds a custom property to an existing pseudo-class. Used to define width of underlines, according to nav anchors length.

        function editStyle(className, property) {
          var sheet = document.styleSheets[0];
          var sheetLength = sheet.cssRules.length || sheet.rules.length;
          var classes = sheet.rules || sheet.cssRules;

          for (var x = 0; x < classes.length; x++) {
            if (classes[x].selectorText == className) {
              sheet.insertRule(
                ""
                  .concat(className, ":hover:before { ")
                  .concat(property.selector, ": ")
                  .concat(property.value, "; }"),
                sheetLength
              );
              sheet.insertRule(
                ""
                  .concat(className, ":hover:after { ")
                  .concat(property.selector, ": ")
                  .concat(property.value, "; }"),
                sheetLength
              );
            }
          }
        } // inits mobile brand svg colors.

        function setDesktopBrand() {
          // const brandDesktop = document.getElementById("brand-desktop-svg");
          brandDesktop.classList.add("brand-negative");
        } // changes mobile svg brand colors.

        function styleDesktopBrand() {
          // const brandDesktop = document.getElementById("brand-desktop-svg");
          brandDesktop.classList.add("brand-color");
          brandDesktop.classList.remove("brand-negative");
        } // restores mobile svg brand color to init.

        function restoreDesktopBrand() {
          // const brandDesktop = document.getElementById("brand-desktop-svg");
          brandDesktop.classList.remove("brand-color");
          brandDesktop.classList.add("brand-negative");
        }

        function prepareForDesktop(callback) {
          appendCtaDesktop();
          restoreDesktopNav(callback);
        } // called when resizing from mobile to large screens, and when loading page on large resolutions, adds or removes nav classes for styling (calling) and append navList to child if resizing.
        // COMMON DEFER

        function restoreDesktopNav(toggleNavClasses) {
          if (navContainer.firstChild !== null) {
            navContainer.removeChild(navList);
            nav.appendChild(navList);
            appendInfoSocial();
          }

          if (navContainer.classList.contains("translate")) {
            toggleNavClasses(true);
            navElements.forEach(function (navEl) {
              navEl.style.animationDelay = "";
              navEl.classList.remove("nav-link-anim");
              navEl.classList.remove("invisible");
            });
          }
        } // appends call to action button to desktop landing page, after subtitle.

        function appendCtaDesktop() {
          var heroTextContainer = document.querySelector(".hero.hero-text");
          var ctaButton = document.getElementById("hero-cta");
          var ctaBtn = ctaButton.parentElement.removeChild(ctaButton);
          heroTextContainer.appendChild(ctaBtn);
        } // appends social svgs to contact info container COMMON DEFER

        function appendInfoSocial() {
          var linkSocial = document.getElementById("link-social");
          var formInfo = document.querySelector(".form-info");
          var socialChild = linkSocial.removeChild(
            linkSocial.firstElementChild
          );
          formInfo.appendChild(socialChild);
        }
      },
      {},
    ],
  },
  {},
  [11]
);
