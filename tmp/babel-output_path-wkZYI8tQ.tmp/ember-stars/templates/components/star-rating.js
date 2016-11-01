define("ember-stars/templates/components/star-rating", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "modules/ember-stars/templates/components/star-rating.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          dom.setNamespace("http://www.w3.org/2000/svg");
          var el1 = dom.createElement("svg");
          dom.setAttribute(el1, "xmlns", "http://www.w3.org/2000/svg");
          dom.setAttribute(el1, "xmlns:xlink", "http://www.w3.org/1999/xlink");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("defs");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("linearGradient");
          dom.setAttribute(el3, "x1", "0%");
          dom.setAttribute(el3, "y1", "0%");
          dom.setAttribute(el3, "x2", "100%");
          dom.setAttribute(el3, "y2", "0%");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("stop");
          dom.setAttribute(el4, "class", "star-rating-filled");
          dom.setAttribute(el4, "offset", "0%");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("stop");
          dom.setAttribute(el4, "class", "star-rating-base");
          dom.setAttribute(el4, "offset", "0%");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("path");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1, 1]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var element4 = dom.childAt(element0, [3]);
          var morphs = new Array(8);
          morphs[0] = dom.createAttrMorph(element0, 'width');
          morphs[1] = dom.createAttrMorph(element0, 'height');
          morphs[2] = dom.createAttrMorph(element0, 'viewBox');
          morphs[3] = dom.createAttrMorph(element1, 'id');
          morphs[4] = dom.createAttrMorph(element2, 'stop-color');
          morphs[5] = dom.createAttrMorph(element3, 'stop-color');
          morphs[6] = dom.createAttrMorph(element4, 'fill');
          morphs[7] = dom.createAttrMorph(element4, 'd');
          return morphs;
        },
        statements: [["attribute", "width", ["get", "width", ["loc", [null, [2, 15], [2, 20]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "height", ["get", "height", ["loc", [null, [2, 32], [2, 38]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "viewBox", ["get", "viewBox", ["loc", [null, [2, 129], [2, 136]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "id", ["concat", [["get", "elementId", ["loc", [null, [4, 30], [4, 39]]], 0, 0, 0, 0], "-star-", ["get", "index", ["loc", [null, [4, 49], [4, 54]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "stop-color", ["get", "fillColor", ["loc", [null, [5, 70], [5, 79]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "stop-color", ["get", "baseColor", ["loc", [null, [6, 68], [6, 77]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "fill", ["concat", ["url(#", ["get", "elementId", ["loc", [null, [10, 23], [10, 32]]], 0, 0, 0, 0], "-star-", ["get", "index", ["loc", [null, [10, 42], [10, 47]]], 0, 0, 0, 0], ")"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "d", ["get", "svgPath", ["loc", [null, [10, 56], [10, 63]]], 0, 0, 0, 0], 0, 0, 0, 0]],
        locals: ["star", "index"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 9
          }
        },
        "moduleName": "modules/ember-stars/templates/components/star-rating.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "stars", ["loc", [null, [1, 8], [1, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [12, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});