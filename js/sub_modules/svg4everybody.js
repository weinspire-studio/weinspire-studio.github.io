!(function (root, factory) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return (root.svg4everybody = factory());
      })
    : "object" == typeof module && module.exports
    ? (module.exports = factory())
    : (root.svg4everybody = factory());
})(this, function () {
  function embed(parent, svg, target, use) {
    if (target) {
      var fragment = document.createDocumentFragment(),
        viewBox =
          !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      viewBox && svg.setAttribute("viewBox", viewBox);
      for (
        // clone the target
        var clone = document.importNode
            ? document.importNode(target, !0)
            : target.cloneNode(!0),
          g = document.createElementNS(
            svg.namespaceURI || "http://www.w3.org/2000/svg",
            "g"
          );
        clone.childNodes.length;

      ) {
        g.appendChild(clone.firstChild);
      }
      if (use) {
        for (var i = 0; use.attributes.length > i; i++) {
          var attr = use.attributes[i];
          "xlink:href" !== attr.name &&
            "href" !== attr.name &&
            g.setAttribute(attr.name, attr.value);
        }
      }
      fragment.appendChild(g), parent.appendChild(fragment);
    }
  }
  function loadreadystatechange(xhr, use) {
    (xhr.onreadystatechange = function () {
      if (4 === xhr.readyState) {
        var cachedDocument = xhr._cachedDocument;
        cachedDocument ||
          ((cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(
            ""
          )),
          (cachedDocument.body.innerHTML = xhr.responseText),
          cachedDocument.domain !== document.domain &&
            (cachedDocument.domain = document.domain),
          (xhr._cachedTarget = {})),
          xhr._embeds.splice(0).map(function (item) {
            var target = xhr._cachedTarget[item.id];
            target ||
              (target = xhr._cachedTarget[
                item.id
              ] = cachedDocument.getElementById(item.id)),
              embed(item.parent, item.svg, target, use);
          });
      }
    }),
      xhr.onreadystatechange();
  }
  function svg4everybody(rawopts) {
    function oninterval() {
      if (
        numberOfSvgUseElementsToBypass &&
        uses.length - numberOfSvgUseElementsToBypass <= 0
      ) {
        return void requestAnimationFrame(oninterval, 67);
      }
      numberOfSvgUseElementsToBypass = 0;
      for (var index = 0; index < uses.length; ) {
        var use = uses[index],
          parent = use.parentNode,
          svg = getSVGAncestor(parent),
          src = use.getAttribute("xlink:href") || use.getAttribute("href");
        if (
          (!src &&
            opts.attributeName &&
            (src = use.getAttribute(opts.attributeName)),
          svg && src)
        ) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              parent.removeChild(use);
              var srcSplit = src.split("#"),
                url = srcSplit.shift(),
                id = srcSplit.join("#");
              if (url.length) {
                var xhr = requests[url];
                xhr ||
                  ((xhr = requests[url] = new XMLHttpRequest()),
                  xhr.open("GET", url),
                  xhr.send(),
                  (xhr._embeds = [])),
                  xhr._embeds.push({
                    parent: parent,
                    svg: svg,
                    id: id,
                  }),
                  loadreadystatechange(xhr, use);
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
    polyfill =
      "polyfill" in opts
        ? opts.polyfill
        : newerIEUA.test(navigator.userAgent) ||
          (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 ||
          (navigator.userAgent.match(webkitUA) || [])[1] < 537 ||
          (edgeUA.test(navigator.userAgent) && inIframe);
    var requests = {},
      requestAnimationFrame = window.requestAnimationFrame || setTimeout,
      uses = document.getElementsByTagName("use"),
      numberOfSvgUseElementsToBypass = 0;
    polyfill && oninterval();
  }
  function getSVGAncestor(node) {
    for (
      var svg = node;
      "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);

    ) {}
    return svg;
  }
  return svg4everybody;
});
