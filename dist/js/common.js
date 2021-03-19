require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWriter = initWriter;
exports.reviewWidth = reviewWidth;
// jshint esversion: 6
var spanWords = document.getElementById("span-words");
var spanWe = document.getElementById("span-we");
var words = spanWords.getAttribute("data-words").split(", ");
var text = "";
var wordCounter = 0;
var wait = 1350;
var isWriting = true;
var isDeleting = false;
var timer;
var scrolledY;
var spanClass;
var threshold = document.body.clientHeight / 2;
var projectWidth = spanWords.clientWidth;
var calculatedWidth;

function setWriter() {
  scrolledY = window.pageYOffset;

  if (scrolledY > threshold) {
    if (isWriting) {
      isWriting = false;
      clearWriter();
    }
  } else {
    if (scrolledY < threshold - threshold / 4) {
      if (!isWriting) {
        text = "";
        wordCounter = 0;
        isDeleting = false;
        isWriting = true;
        typeWriter();
      }
    }
  }
}

function typeWriter() {
  var wordIndex = wordCounter % words.length;
  var currentWord = words[wordIndex];
  var typeSpeed = 175;

  if (isDeleting) {
    text = currentWord.substring(0, text.length - 1);
    typeSpeed = typeSpeed / 2;
  } else {
    text = currentWord.substring(0, text.length + 1);
  }

  if (!isDeleting && text === currentWord) {
    if (currentWord === "inspire") {
      typeSpeed = 3400;
    } else {
      typeSpeed = wait;
    }

    isDeleting = true;
  } else if (isDeleting && text === "") {
    isDeleting = false;
    wordCounter++;
    typeSpeed = 500;
  }

  if (currentWord === "inspire") {
    spanClass = "inner-span text-highlight";
    spanWe.classList.add("text-highlight");
  } else {
    spanClass = "inner-span";
    spanWe.classList.remove("text-highlight");
  }

  spanWords.innerHTML = "<span class=\"".concat(spanClass, "\">").concat(text, "</span>");
  timer = setTimeout(function () {
    return typeWriter();
  }, typeSpeed);
}

function initWriter(isMobile, supportsPassive) {
  var delay = 1450;

  if (isMobile) {
    calculatedWidth = spanWe.clientWidth + projectWidth + 28.5;
    spanWe.parentElement.style.width = "".concat(calculatedWidth, "px");
    delay = 1250;
  }

  window.addEventListener("scroll", setWriter, supportsPassive ? {
    passive: true
  } : false);
  var timer = setTimeout(function () {
    if (window.pageYOffset < threshold) {
      typeWriter();
    }

    if (spanWords.style.opacity === "") {
      spanWords.style.opacity = 1;
    }

    clearTimeout(timer);
  }, delay); // TODO: should update calculatedWidth on width change.
}

function clearWriter() {
  clearTimeout(timer);
}

function reviewWidth(isMobile) {
  if (isMobile) {
    calculatedWidth = spanWe.clientWidth + projectWidth + 27.5;
    spanWe.parentElement.style.width = "".concat(calculatedWidth, "px");
  } else {
    spanWe.parentElement.style.width = "100%";
  }
}

},{}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (root, factory) {
  "function" == typeof define && define.amd ? define([], function () {
    return root.svg4everybody = factory();
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = factory() : root.svg4everybody = factory();
}(void 0, function () {
  function embed(parent, svg, target, use) {
    if (target) {
      var fragment = document.createDocumentFragment(),
          viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      viewBox && svg.setAttribute("viewBox", viewBox);

      for ( // clone the target
      var clone = document.importNode ? document.importNode(target, !0) : target.cloneNode(!0), g = document.createElementNS(svg.namespaceURI || "http://www.w3.org/2000/svg", "g"); clone.childNodes.length;) {
        g.appendChild(clone.firstChild);
      }

      if (use) {
        for (var i = 0; use.attributes.length > i; i++) {
          var attr = use.attributes[i];
          "xlink:href" !== attr.name && "href" !== attr.name && g.setAttribute(attr.name, attr.value);
        }
      }

      fragment.appendChild(g), parent.appendChild(fragment);
    }
  }

  function loadreadystatechange(xhr, use) {
    xhr.onreadystatechange = function () {
      if (4 === xhr.readyState) {
        var cachedDocument = xhr._cachedDocument;
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, cachedDocument.domain !== document.domain && (cachedDocument.domain = document.domain), xhr._cachedTarget = {}), xhr._embeds.splice(0).map(function (item) {
          var target = xhr._cachedTarget[item.id];
          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), embed(item.parent, item.svg, target, use);
        });
      }
    }, xhr.onreadystatechange();
  }

  function svg4everybody(rawopts) {
    function oninterval() {
      if (numberOfSvgUseElementsToBypass && uses.length - numberOfSvgUseElementsToBypass <= 0) {
        return void requestAnimationFrame(oninterval, 67);
      }

      numberOfSvgUseElementsToBypass = 0;

      for (var index = 0; index < uses.length;) {
        var use = uses[index],
            parent = use.parentNode,
            svg = getSVGAncestor(parent),
            src = use.getAttribute("xlink:href") || use.getAttribute("href");

        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              parent.removeChild(use);
              var srcSplit = src.split("#"),
                  url = srcSplit.shift(),
                  id = srcSplit.join("#");

              if (url.length) {
                var xhr = requests[url];
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []), xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }), loadreadystatechange(xhr, use);
              } else {
                embed(parent, svg, document.getElementById(id), use);
              }
            } else {
              ++index, ++numberOfSvgUseElementsToBypass;
            }
          }
        } else {
          ++index;
        }
      }

      requestAnimationFrame(oninterval, 67);
    }

    var polyfill,
        opts = Object(rawopts),
        newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        webkitUA = /\bAppleWebKit\/(\d+)\b/,
        olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
        edgeUA = /\bEdge\/.(\d+)\b/,
        inIframe = window.top !== window.self;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
    var requests = {},
        requestAnimationFrame = window.requestAnimationFrame || setTimeout,
        uses = document.getElementsByTagName("use"),
        numberOfSvgUseElementsToBypass = 0;
    polyfill && oninterval();
  }

  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}

    return svg;
  }

  return svg4everybody;
});

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hidePreloader = hidePreloader;

var _animation = require("../sub_modules/animation.js");

// jshint esversion: 6
var preloader = document.getElementById("preloader");
var preloaderContainer = document.getElementById("preloader-container");

function hidePreloader() {
  preloaderContainer.classList.add("fade-preloader");
  preloaderContainer.addEventListener("animationend", setLanding);
}

function setLanding() {
  slidePreloader();
  (0, _animation.animateAssets)();
  removeListeners();
}

function slidePreloader() {
  preloader.classList.add("translate-preloader");
  var timer = setTimeout(function () {
    preloader.style.display = "none";
    clearTimeout(timer);
  }, 2000);
}

function removeListeners() {
  window.removeEventListener("load", hidePreloader);
  preloaderContainer.removeEventListener("animationend", setLanding);
}

},{"../sub_modules/animation.js":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoothScroll = smoothScroll;
exports.animateImages = animateImages;
exports.unbindImages = unbindImages;
// jshint esversion: 6
// import $ from "../../node_custom_modules/jquery/jquery.min.js";
var hasHoverListenerOnPortolio = false;
var isExpanded = false; // jQuery for animated scroll

function smoothScroll() {
  arrowScroll();
  linksScroll();
}

function arrowScroll() {
  $(".arrow-up").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 950);
  });
}

function linksScroll() {
  $("#section-navbar ul.nav-list > li:first-child").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $("#section-projects-design").offset().top - 200
    }, 950);
  });
  $("#section-navbar ul.nav-list > li:nth-child(2)").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $("#section-services").offset().top
    }, 950);
  });
  $("#section-navbar ul.nav-list > li:nth-child(3)").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $("#section-about").offset().top
    }, 950);
  });
  $("#section-navbar ul.nav-list > li:nth-child(4)").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $("#section-contact").offset().top
    }, 950);
  });
} // TODO: for accessibility: bind to change width on focus (same with animateImagesSafari) .bind("mouseenter focus mouseleave"
// adds hover effect on desktop


function animateImages() {
  $("#section-projects-design li").hover(function () {
    $(this).addClass("expanded");
    $(this).siblings().addClass("contracted");
    $(this).children().eq(2).addClass("show-caption");
    isExpanded = true;
  }, function () {
    $(this).removeClass("expanded");
    $(this).siblings().removeClass("contracted");
    $(this).children().eq(2).removeClass("show-caption");
    isExpanded = false;
  });
  hasHoverListenerOnPortolio = true;
} // unbinds listeners to desktop component (for mobile cube)


function unbindImages() {
  if (hasHoverListenerOnPortolio) {
    $("#section-projects-design li").off("mouseenter mouseleave");

    if (isExpanded) {
      $(".arrow-up").css("background-color, blue");
      $("#section-projects-design li").removeClass("expanded");
      $("#section-projects-design li").removeClass("contracted");
      $(".link-caption").removeClass("show-caption");
      isExpanded = false;
    }
  }
}

},{}],3:[function(require,module,exports){
"use strict";

"document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || !function (t) {
  "use strict";

  if ("Element" in t) {
    var e = "classList",
        n = "prototype",
        i = t.Element[n],
        s = Object,
        r = String[n].trim || function () {
      return this.replace(/^\s+|\s+$/g, "");
    },
        o = Array[n].indexOf || function (t) {
      for (var e = 0, n = this.length; n > e; e++) {
        if (e in this && this[e] === t) return e;
      }

      return -1;
    },
        c = function c(t, e) {
      this.name = t, this.code = DOMException[t], this.message = e;
    },
        a = function a(t, e) {
      if ("" === e) throw new c("SYNTAX_ERR", "The token must not be empty.");
      if (/\s/.test(e)) throw new c("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
      return o.call(t, e);
    },
        l = function l(t) {
      for (var e = r.call(t.getAttribute("class") || ""), n = e ? e.split(/\s+/) : [], i = 0, s = n.length; s > i; i++) {
        this.push(n[i]);
      }

      this._updateClassName = function () {
        t.setAttribute("class", this.toString());
      };
    },
        u = l[n] = [],
        h = function h() {
      return new l(this);
    };

    if (c[n] = Error[n], u.item = function (t) {
      return this[t] || null;
    }, u.contains = function (t) {
      return ~a(this, t + "");
    }, u.add = function () {
      var t,
          e = arguments,
          n = 0,
          i = e.length,
          s = !1;

      do {
        t = e[n] + "", ~a(this, t) || (this.push(t), s = !0);
      } while (++n < i);

      s && this._updateClassName();
    }, u.remove = function () {
      var t,
          e,
          n = arguments,
          i = 0,
          s = n.length,
          r = !1;

      do {
        for (t = n[i] + "", e = a(this, t); ~e;) {
          this.splice(e, 1), r = !0, e = a(this, t);
        }
      } while (++i < s);

      r && this._updateClassName();
    }, u.toggle = function (t, e) {
      var n = this.contains(t),
          i = n ? e !== !0 && "remove" : e !== !1 && "add";
      return i && this[i](t), e === !0 || e === !1 ? e : !n;
    }, u.replace = function (t, e) {
      var n = a(t + "");
      ~n && (this.splice(n, 1, e), this._updateClassName());
    }, u.toString = function () {
      return this.join(" ");
    }, s.defineProperty) {
      var f = {
        get: h,
        enumerable: !0,
        configurable: !0
      };

      try {
        s.defineProperty(i, e, f);
      } catch (p) {
        void 0 !== p.number && -2146823252 !== p.number || (f.enumerable = !1, s.defineProperty(i, e, f));
      }
    } else s[n].__defineGetter__ && i.__defineGetter__(e, h);
  }
}(self), function () {
  "use strict";

  var t = document.createElement("_");

  if (t.classList.add("c1", "c2"), !t.classList.contains("c2")) {
    var e = function e(t) {
      var e = DOMTokenList.prototype[t];

      DOMTokenList.prototype[t] = function (t) {
        var n,
            i = arguments.length;

        for (n = 0; i > n; n++) {
          t = arguments[n], e.call(this, t);
        }
      };
    };

    e("add"), e("remove");
  }

  if (t.classList.toggle("c3", !1), t.classList.contains("c3")) {
    var n = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function (t, e) {
      return 1 in arguments && !this.contains(t) == !e ? e : n.call(this, t);
    };
  }

  "replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function (t, e) {
    var n = this.toString().split(" "),
        i = n.indexOf(t + "");
    ~i && (n = n.slice(i), this.remove.apply(this, n), this.add(e), this.add.apply(this, n.slice(1)));
  }), t = null;
}());

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareRequests = prepareRequests;
exports.animateAssets = animateAssets;
exports.slideAnim = slideAnim;

var _http = require("../sub_modules/http");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// jshint esversion: 6
var baseUrl = "/assets/optimized/";
var targets = ["svg-background.svg", "design.svg", "software.svg", "marketing.svg"];
var controller = new ScrollMagic.Controller();
var tl = gsap.timeline();
var tl2 = gsap.timeline();
var tl3 = gsap.timeline();
var tl4 = gsap.timeline();
var tl5 = gsap.timeline();
var tl6 = gsap.timeline();

function prepareRequests() {
  var sectionBg = document.getElementById("section-background");
  var designContainer = document.getElementById("grid-btm-icon");
  var softwareContainer = document.getElementById("grid-mid-icon");
  var marketingContainer = document.getElementById("grid-top-icon");
  var debouncedTest = (0, _debounce["default"])(animateBackground, 200, {
    leading: true,
    trailing: true
  });
  var debouncedTest2 = (0, _debounce["default"])(animateIconDesign, 200, {
    leading: true,
    trailing: true
  });
  (0, _http.makeRequest)(baseUrl + targets[0], sectionBg, debouncedTest);
  (0, _http.makeRequest)(baseUrl + targets[1], designContainer, debouncedTest2);
  (0, _http.makeRequest)(baseUrl + targets[2], softwareContainer, animateIconSoftware);
  (0, _http.makeRequest)(baseUrl + targets[3], marketingContainer, animateIconMarketing);
}

function animateBackground() {
  var svgPaths = document.querySelectorAll("#svg-background path"); // svgPaths[4].style =
  //   "-webkit-filter: drop-shadow(0px -2px 5px rgba(107, 124, 141, .65));";

  tl.to(svgPaths[0], 1, {
    y: 95,
    ease: Linear.easeNone
  }, 0.4).to(svgPaths[1], 1, {
    y: 175,
    ease: Linear.easeNone
  }, 0.2).to(svgPaths[2], 1, {
    y: 140,
    ease: Linear.easeNone
  }, 0.3).to(svgPaths[3], 1, {
    y: 25,
    ease: Linear.easeNone
  }, 0);
  var ParallaxScene = new ScrollMagic.Scene({
    // triggerElement: this,
    triggerHook: 0,
    duration: "100%" // tweenChanges: true,

  }).setTween(tl).addTo(controller);
}

function animateIconDesign() {
  var iconDesign = document.getElementById("design");
  var iconDesignPaths = document.querySelectorAll("#design path");
  var pathsArray = Array.prototype.slice.call(iconDesignPaths);
  pathsArray.forEach(function (path) {
    preparePath(path);
  });
  var bluePathsArray = [];
  var greenPathsArray = [];
  bluePathsArray.push(pathsArray[0], pathsArray[3], pathsArray[4], pathsArray[6], pathsArray[7], pathsArray[8], pathsArray[10]);
  greenPathsArray.push(pathsArray[1], pathsArray[2], pathsArray[5], pathsArray[9], pathsArray[11], pathsArray[12]); // prettier-ignore

  tl2.to(pathsArray[0], 1, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // big sq blue
  .to(pathsArray[1], 1, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // big sq green 
  .to(pathsArray[2], 0.3, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // sm sq green
  .to(pathsArray[3], 0.7, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">") // sm sq blue
  .to(pathsArray[4], 0.8, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.35) // rect out blue 
  .to(pathsArray[5], 0.8, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.15) // rect in green
  .to(pathsArray[6], 0.4, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.1) // tri blue
  .to(pathsArray[7], 0.3, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">") // tri blue
  .to(pathsArray[8], 0.2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">") // tri blue
  .to(pathsArray[10], 0.4, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.1) // pn front green
  .to(pathsArray[9], 1.2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">-0.2") // pn out blue
  .to(pathsArray[11], 1, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, "<") // pn line green
  .to(pathsArray[12], 0.3, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, "<") // pn dot green
  .to(bluePathsArray, 1.1, {
    stroke: "#33629c",
    ease: Linear.easeNone
  }, 0).to(greenPathsArray, 1.1, {
    stroke: "#009889",
    ease: Linear.easeNone
  }, 0);
  var drawScene = new ScrollMagic.Scene({
    triggerElement: iconDesign,
    triggerHook: 1,
    duration: "98%" // tweenChanges: true,

  }).setTween(tl2).addTo(controller);
}

function animateIconSoftware() {
  var iconSoftware = document.getElementById("software");
  var iconSoftwarePaths = document.querySelectorAll("#software path");
  var pathsArray = Array.prototype.slice.call(iconSoftwarePaths);
  pathsArray.forEach(function (path) {
    preparePath(path);
  });
  var bluePathsArray = [];
  var greenPathsArray = [];
  bluePathsArray.push(pathsArray[0], pathsArray[1], pathsArray[4], pathsArray[6], pathsArray[8], pathsArray[9], pathsArray[10], pathsArray[11], pathsArray[13], pathsArray[14], pathsArray[15], pathsArray[17]);
  greenPathsArray.push(pathsArray[2], pathsArray[3], pathsArray[5], pathsArray[7], pathsArray[12], pathsArray[16]); // prettier-ignore

  tl5.to(pathsArray[0], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //monitor out blue
  .to(pathsArray[1], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //monitor in blue
  .to(pathsArray[2], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //monitor rect up green
  .to(pathsArray[3], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor youtube out green
  .to(pathsArray[4], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //tablet out blue
  .to(pathsArray[5], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor right square green
  .to(pathsArray[6], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor mouse blue
  .to(pathsArray[7], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor text green
  .to(pathsArray[8], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // cell out blue
  .to(pathsArray[9], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor youtube out blue
  .to(pathsArray[10], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // monitor youtube in blue
  .to(pathsArray[11], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // tablet in blue
  .to(pathsArray[12], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) // tablet imgs green
  .to(pathsArray[13], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // tablet text blue
  .to(pathsArray[14], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // tablet text blue
  .to(pathsArray[15], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // cell in blue
  .to(pathsArray[16], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // cell imgs green
  .to(pathsArray[17], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) // cell text blue
  .to(bluePathsArray, 2, {
    stroke: "#33629c",
    ease: Linear.easeNone
  }, 0).to(greenPathsArray, 2, {
    stroke: "#009889",
    ease: Linear.easeNone
  }, 0); // .to(greenPathsArray, 1, { stroke: "#33629c", ease: Linear.easeNone }, 0);

  var drawScene = new ScrollMagic.Scene({
    triggerElement: iconSoftware,
    triggerHook: 1,
    duration: "75%" // tweenChanges: true,

  }).setTween(tl5).addTo(controller);
}

function animateIconMarketing() {
  var iconMarketing = document.getElementById("marketing");
  var iconMarketingPaths = document.querySelectorAll("#marketing path");
  var pathsArray = Array.prototype.slice.call(iconMarketingPaths);
  pathsArray.forEach(function (path) {
    preparePath(path);
  });
  var bluePathsArray = [];
  var greenPathsArray = [];
  bluePathsArray.push(pathsArray[0], pathsArray[1], pathsArray[2], pathsArray[3], pathsArray[8], pathsArray[9], pathsArray[10], pathsArray[11], pathsArray[14], pathsArray[16], pathsArray[17]);
  greenPathsArray.push(pathsArray[4], pathsArray[5], pathsArray[6], pathsArray[7], pathsArray[12], pathsArray[13], pathsArray[15]); // prettier-ignore

  tl6.to(pathsArray[0], 2.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //blue
  .to(pathsArray[1], 2.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //blue
  .to(pathsArray[2], 1, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 1) //blue
  .to(pathsArray[3], 1.75, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[4], 0.6, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.3) //green
  .to(pathsArray[5], 0.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">") //green
  .to(pathsArray[6], 0.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, ">") //green
  .to(pathsArray[7], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //green
  .to(pathsArray[8], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[9], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[10], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[11], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[12], 1.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //green
  .to(pathsArray[13], 1.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //green
  .to(pathsArray[14], 1.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //blue
  .to(pathsArray[15], 1.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0.5) //green
  .to(pathsArray[16], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(pathsArray[17], 2, {
    strokeDashoffset: 0,
    ease: Linear.easeNone
  }, 0) //blue
  .to(bluePathsArray, 2, {
    stroke: "#33629c",
    ease: Linear.easeNone
  }, 0).to(greenPathsArray, 2, {
    stroke: "#009889",
    ease: Linear.easeNone
  }, 0);
  var drawScene = new ScrollMagic.Scene({
    triggerElement: iconMarketing,
    triggerHook: 1,
    duration: "92.5%" // tweenChanges: true,

  }).setTween(tl6).addTo(controller);
}

function preparePath(path) {
  var pathLength = path.getTotalLength();
  path.style.strokeDashoffset = pathLength;
  path.style.strokeDasharray = pathLength;
}

function animateAssets() {
  zoomHeroDivs();
  animateSvgPaths();
}

function zoomHeroDivs() {
  var heroDivs = document.querySelectorAll("#section-hero .hero");
  tl3.from(heroDivs[0], 1.25, {
    scale: 1.25
  }).from(heroDivs[1], 1.25, {
    scale: 1.15
  }, 0);
}

function animateSvgPaths() {
  var svgPaths = document.querySelectorAll("#svg-background path"); //   .from(svgPaths[0], 1, { opacity: 0, scale: 1.25 }, 0.4)
  //   .from(svgPaths[1], 1.25, { opacity: 0, scale: 1.25 }, 0.2)
  //   .from(svgPaths[2], 1.25, { opacity: 0, scaleX: 1.25, scaleY: 0.9, rotation: "1deg" }, 0.3)
  //   .from(svgPaths[3], 1.5, { opacity: 0, scale: 1.03 }, 0);

  tl4.from(svgPaths[0], {
    opacity: 0,
    duration: 2
  }, 1).from(svgPaths[1], {
    opacity: 0,
    duration: 2
  }, 0.4).from(svgPaths[2], {
    opacity: 0,
    duration: 2
  }, 0.7).from(svgPaths[3], {
    opacity: 0,
    duration: 2
  }, 0);
}

function slideAnim(direction) {
  var tl = gsap.timeline();
  var xDirFrom, xDirTo, rotationFrom, rotationTo;

  if (direction === "left") {
    xDirFrom = 100;
    xDirTo = -200;
    rotationFrom = 20;
    rotationTo = 0;
  } else {
    xDirFrom = -200;
    xDirTo = 200;
    rotationFrom = -20;
    rotationTo = 0;
  }

  tl.fromTo(".modal-overlay", 2.1, {
    rotation: rotationFrom,
    scaleX: 2,
    scaleY: 200,
    xPercent: xDirFrom,
    yPercent: 0,
    opacity: 1,
    transformOrigin: "0% 0%"
  }, {
    rotation: rotationTo,
    xPercent: xDirTo,
    yPercent: 0,
    transformOrigin: "50% 50%",
    ease: Power2.easeOut
  });
} // let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xhr.responseText, "image/svg+xml");
// jQuery way
// $.get(url, function (xmlDoc) {
//   let svg = $(xmlDoc).find("svg")[0];
//   sectionBg.append(svg);
// });
// fill="none" stroke="#000000" stroke-width="1"

},{"../sub_modules/http":4,"lodash/debounce":16}],16:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":17,"./now":20,"./toNumber":21}],21:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":17,"./isSymbol":19}],19:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":11,"./isObjectLike":18}],18:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],11:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":10,"./_getRawTag":13,"./_objectToString":14}],14:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],13:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":10}],10:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":15}],20:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":15}],15:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":12}],12:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = makeRequest;
exports.loadHDImages = loadHDImages;

// jshint esversion: 6
function makeRequest(url, section) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        section.appendChild(xhr.responseXML.documentElement);
        if (callback) callback();
      } else console.log("There was a problem with the request.");
    }
  };

  xhr.open("GET", url);
  xhr.send();
}

function loadHDImages(clickedImage, modalImage, modalCaption) {
  var images = document.querySelectorAll(".swiper-wrapper img");
  var caption = clickedImage.nextElementSibling.nextElementSibling;
  var newSource;
  var h4 = document.createElement("h4");
  var h6 = document.createElement("h6");
  images.forEach(function (img) {
    if (img.src === clickedImage.src) {
      newSource = clickedImage.src.replace("-min", "");
      modalImage.src = newSource;
      if (modalCaption.textContent !== "") modalCaption.textContent = "";
      modalCaption.appendChild(h4);
      modalCaption.appendChild(h6);
      modalCaption.firstElementChild.textContent = caption.firstElementChild.textContent;
      modalCaption.lastElementChild.textContent = caption.lastElementChild.textContent;
      img.src = newSource;
    }
  });
  setTimeout(function () {
    images.forEach(function (img) {
      if (img.src !== clickedImage.src) {
        newSource = img.src.replace("-min", "");
        img.src = newSource;
      }
    });
  }, 400);
} // lazyLoadInstance.update();
// function makeRequest2(url, section, callback = null) {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         console.log(xhr);
//         section.appendChild(img);
//         if (callback) {
//           callback();
//         } else {
//           console.log("no call");
//         }
//       } else {
//         console.log("There was a problem with the request.");
//       }
//     }
//   };
//   xhr.open("GET", url);
//   xhr.send();
// }
// function prepareRequests() {
//   const containers = document.querySelectorAll(".content-link");
//   makeRequest2(url, containers[1], testCallback);
// }
// function testCallback() {
//   console.log(document.querySelectorAll(".content-link"));
// }

},{}]},{},[9,7,2,5,8,3,4]);
