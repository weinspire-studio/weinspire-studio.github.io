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
    10: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.desktopDeferCode = desktopDeferCode;
        exports.prepareForMobile = prepareForMobile;

        var _intersection = require("./intersection");

        // jshint esversion: 6
        var list = document.querySelector(".swiper-wrapper");
        var links = document.querySelectorAll(".swiper-slide");
        var modal = document.getElementById("modal");
        var modalImage = document.getElementById("modal-image");
        var modalCaption = document.getElementById("modal-caption");
        var cross = document.getElementById("modal-close");
        var leftArrow = document.getElementById("modal-arrow-left");
        var rightArrow = document.getElementById("modal-arrow-right");
        var hasRequested = false;
        var modalOpen = false;
        var modalHandler;
        var leftArrowHandler, rightArrowHandler, arrowKeyHandler, escapeHandler;
        var handlers = {
          left: leftArrowHandler,
          right: rightArrowHandler,
          key: arrowKeyHandler,
          escape: escapeHandler,
        };

        function desktopDeferCode(
          isSafari,
          animateImages,
          loadHDImages,
          slideAnim
        ) {
          initModal(loadHDImages, slideAnim);
          if (isSafari) animateImagesSafari();
          else animateImages();
          (0, _intersection.initIntersection)();
        }

        function initModal(loadHDImages, slideAnim) {
          if (!hasRequested) {
            list.addEventListener(
              "click",
              (modalHandler = function modalHandler(e) {
                var imageTarget;
                modalOpen = true;

                if (e.target.tagName === "DIV") {
                  if (e.target.className.indexOf("link-caption") === -1)
                    imageTarget = e.target.previousElementSibling;
                  else
                    imageTarget =
                      e.target.previousElementSibling.previousElementSibling;
                } else if (
                  e.target.tagName === "H4" ||
                  e.target.tagName === "H6"
                )
                  imageTarget =
                    e.target.parentNode.previousElementSibling
                      .previousElementSibling;
                else return;

                loadHDImages(imageTarget, modalImage, modalCaption);
                var timer = setTimeout(function () {
                  animateEntry();
                  clearTimeout(timer);
                }, 200);
                slideImages(imageTarget.parentNode, slideAnim);
                document.addEventListener(
                  "keyup",
                  (handlers.escape = function (event) {
                    var key = event.key || event.keyCode;

                    if (key === "Escape" || key === "Esc") {
                      closeModal();
                    }
                  })
                );
              })
            );
            var bindedCloseModal = closeModal.bind(null, handlers);
            cross.addEventListener("click", bindedCloseModal);
            hasRequested = true;
          }
        }

        function animateEntry() {
          modal.classList.add("visible");
          modalImage.style.animation = "1s emerge-anim";
          modalImage.addEventListener("animationend", function () {
            modalImage.parentNode.style.overflow = "hidden";
          });
          modalCaption.style.animation = "1s caption-emerge-anim";
          cross.classList.add("emerge");
          leftArrow.classList.add("emerge");
          rightArrow.classList.add("emerge");
        }

        function slideImages(link, slideAnim) {
          if (!link.previousElementSibling) {
            leftArrow.classList.add("not-allowed");
          } else if (!link.nextElementSibling) {
            rightArrow.classList.add("not-allowed");
          }

          leftArrow.addEventListener(
            "click",
            (handlers.left = function () {
              link = moveLeft(link, slideAnim);
            })
          );
          rightArrow.addEventListener(
            "click",
            (handlers.right = function () {
              link = moveRight(link, slideAnim);
            })
          );
          document.addEventListener(
            "keyup",
            (handlers.key = function (event) {
              var key = event.key || event.keyCode;

              if (key === "ArrowLeft" || key === "Left" || key == "37") {
                link = moveLeft(link, slideAnim);
              } else if (
                key === "ArrowRight" ||
                key === "Right" ||
                key == "39"
              ) {
                link = moveRight(link, slideAnim);
              }
            })
          );
        }

        function moveLeft(link, slideAnim) {
          if (!leftArrow.classList.contains("not-allowed")) {
            slideAnim("left");

            if (link.previousElementSibling) {
              if (!link.previousElementSibling.previousElementSibling) {
                leftArrow.classList.add("not-allowed");
              } else if (rightArrow.classList.contains("not-allowed"))
                rightArrow.classList.remove("not-allowed");

              var previousLink = link.previousElementSibling;
              changeImage(previousLink);
              return previousLink;
            }
          }

          return link;
        }

        function moveRight(link, slideAnim) {
          if (!rightArrow.classList.contains("not-allowed")) {
            slideAnim("right");

            if (link.nextElementSibling) {
              if (!link.nextElementSibling.nextElementSibling) {
                rightArrow.classList.add("not-allowed");
              } else if (leftArrow.classList.contains("not-allowed"))
                leftArrow.classList.remove("not-allowed");

              var nextLink = link.nextElementSibling;
              changeImage(nextLink);
              return nextLink;
            }
          }

          return link;
        }

        function changeImage(link) {
          var title;
          var subtitle;

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

          setTimeout(function () {
            modalCaption.firstElementChild.textContent = title.textContent;
            modalCaption.lastElementChild.textContent = subtitle.textContent;
            modalImage.src = link.firstElementChild.src;
          }, 300);
        }

        function closeModal() {
          if (modalOpen) {
            modal.classList.remove("visible");
            cross.classList.remove("emerge");
            leftArrow.classList.remove("emerge", "not-allowed");
            rightArrow.classList.remove("emerge", "not-allowed");
            modalCaption.style.animation = "";
            modalImage.style.animation = "";
            modalImage.parentNode.style.overflow = "visible";
            leftArrow.removeEventListener("click", handlers.left);
            rightArrow.removeEventListener("click", handlers.right);
            document.removeEventListener("keyup", handlers.key);
            document.removeEventListener("keyup", handlers.escape);
            modalOpen = false;
          }
        }

        function animateImagesSafari() {
          list.addEventListener("mouseover", styleLink);
          list.addEventListener("mouseleave", restoreLink);
        }

        function styleLink() {
          links.forEach(function (link) {
            if (link.matches(":hover")) {
              link.style.width = "36%";
              link.classList.add("overlay-transparent");
              link.lastElementChild.classList.add("show-caption");
            } else {
              link.style.width = "18%";
              link.classList.remove("overlay-transparent");
              link.lastElementChild.classList.remove("show-caption");
            }
          });
        }

        function restoreLink() {
          links.forEach(function (link) {
            link.style.width = "20%";
            link.classList.remove("overlay-transparent");
            link.lastElementChild.classList.remove("show-caption");
          });
        }

        function prepareForMobile(isSafari) {
          closeModal(handlers);
          destroyModal();
          if (isSafari) removeImagesListeners();
        }

        function destroyModal() {
          list.removeEventListener("click", modalHandler);
          hasRequested = false;
        }

        function removeImagesListeners() {
          list.removeEventListener("mouseover", styleLink);
          list.removeEventListener("mouseleave", restoreLink);
        }
      },
      { "./intersection": 2 },
    ],
    2: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initIntersection = initIntersection;
        // jshint esversion: 6
        var svgsArray = document.querySelectorAll(
          "#software-grid .software-container > svg"
        );
        var videosArray = document.querySelectorAll(
          "#software-grid .software-container > video"
        );

        function initIntersection() {
          if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window
          ) {
            var observer;
            var observerOptions = {
              root: null,
              rootMargin: "0px",
              threshold: 1,
            };
            observer = new IntersectionObserver(
              processEntries,
              observerOptions
            );
            svgsArray.forEach(function (svg) {
              observer.observe(svg);
            });
          } else {
            svgsArray.forEach(function (svg) {
              intersectViewport(svg);
            });
          }
        }

        function processEntries(entries, observer) {
          entries.forEach(function (entry) {
            if (typeof entry.isIntersecting !== "undefined") {
              if (entry.isIntersecting) {
                videosArray.forEach(function (video) {
                  if (!video.paused) video.pause();
                });
                entry.target.nextElementSibling.play();
                observer.unobserve(entry.target);
              }
            } else if (typeof entry.intersectionRatio !== "undefined") {
              if (entry.intersectionRatio > 0) {
                videosArray.forEach(function (video) {
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
            supportsPassive
              ? {
                  passive: true,
                }
              : false
          );
          addEventListener("resize", processInterception.bind(null, element));
        }

        function processInterception(ele) {
          var _ele$getBoundingClien = ele.getBoundingClientRect(),
            top = _ele$getBoundingClien.top,
            bottom = _ele$getBoundingClien.bottom;

          var vHeight =
            window.innerHeight || document.documentElement.clientHeight;

          if ((top > 0 || bottom > 0) && top < vHeight) {
            videosArray.forEach(function (video) {
              if (video.playing) video.pause();
            });
            ele.nextElementSibling.play();
            removeEventListener("load", processInterception);
            removeEventListener(
              "scroll",
              processInterception,
              supportsPassive
                ? {
                    passive: true,
                  }
                : false
            );
            removeEventListener("resize", processInterception);
          }
        }
      },
      {},
    ],
  },
  {},
  [10]
);
