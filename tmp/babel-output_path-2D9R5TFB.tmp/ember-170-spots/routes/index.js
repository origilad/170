define('ember-170-spots/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('map');
    }
  });
});