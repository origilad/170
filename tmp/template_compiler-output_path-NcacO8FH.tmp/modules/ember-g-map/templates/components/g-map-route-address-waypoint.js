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
          "line": 2,
          "column": 0
        }
      },
      "moduleName": "modules/ember-g-map/templates/components/g-map-route-address-waypoint.hbs"
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
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["inline","g-map-route-waypoint",[["get","routeContext",["loc",[null,[1,23],[1,35]]],0,0,0,0]],["lat",["subexpr","@mut",[["get","lat",["loc",[null,[1,40],[1,43]]],0,0,0,0]],[],[],0,0],"lng",["subexpr","@mut",[["get","lng",["loc",[null,[1,48],[1,51]]],0,0,0,0]],[],[],0,0]],["loc",[null,[1,0],[1,53]]],0,0]
    ],
    locals: [],
    templates: []
  };
}()));