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
          "line": 13,
          "column": 0
        }
      },
      "moduleName": "ember-170-spots/templates/components/navigation-bar.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createTextNode("\n\n    ");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n\n\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
      return morphs;
    },
    statements: [
      ["inline","select-picker",[],["content",["subexpr","@mut",[["get","singleContent",["loc",[null,[3,28],[3,41]]],0,0,0,0]],[],[],0,0],"selection",["subexpr","@mut",[["get","singleChoice",["loc",[null,[4,14],[4,26]]],0,0,0,0]],[],[],0,0],"action",["subexpr","action",["setSingleChoice"],[],["loc",[null,[5,11],[5,37]]],0,0],"optionLabelPath","content.label","optionValuePath","content.value"],["loc",[null,[3,4],[7,37]]],0,0],
      ["content","yield",["loc",[null,[12,0],[12,9]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));