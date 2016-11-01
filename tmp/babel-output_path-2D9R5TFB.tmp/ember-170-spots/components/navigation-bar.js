define("ember-170-spots/components/navigation-bar", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    routes: _ember["default"].A(["map", "adventure-analytics", "travel-log"]),

    singleContent: _ember["default"].A([{ "label": "Map", "value": "map" }, { "label": "Adventure Analytics", "value": "adventure-analytics" }, { "label": "Travel Log", "value": "travel-log" }]),

    actions: {
      setSingleChoice: function setSingleChoice() {
        console.log(this.get('singleChoice').value);
        this.get('router').transitionTo(this.get('singleChoice').value);
      }
    }
  });
});