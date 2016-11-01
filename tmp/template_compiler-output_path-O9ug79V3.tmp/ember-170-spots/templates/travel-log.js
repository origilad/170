export default Ember.HTMLBars.template((function() {
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
          "line": 4,
          "column": 10
        }
      },
      "moduleName": "ember-170-spots/templates/travel-log.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("h1");
      var el2 = dom.createTextNode("THIS IS THE TRAVEL LOG PAGE");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["inline","navigation-bar",[],["singleChoice",["subexpr","@mut",[["get","menuOption",["loc",[null,[1,30],[1,40]]],0,0,0,0]],[],[],0,0]],["loc",[null,[1,0],[1,42]]],0,0],
      ["content","outlet",["loc",[null,[4,0],[4,10]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));