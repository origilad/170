define("ember-170-spots/routes/map", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Route.extend({
        menuOption: { "label": "Map", "value": "map" },

        actions: {
            handleClick: function handleClick() {
                this.transitionTo('logged-adventure');
            },
            logAdventure: function logAdventure() {
                this.transitionTo('log-new-adventure');
            }
        }
    });
});