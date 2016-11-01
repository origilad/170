define('ember-170-spots/initializers/ember-google-map', ['exports', 'ember-google-map/utils/load-google-map'], function (exports, _emberGoogleMapUtilsLoadGoogleMap) {
  exports.initialize = initialize;

  function initialize(container, application) {
    application.register('util:load-google-map', _emberGoogleMapUtilsLoadGoogleMap['default'], { instantiate: false });
    application.inject('route', 'loadGoogleMap', 'util:load-google-map');
  }

  exports['default'] = {
    name: 'ember-google-map',
    initialize: initialize
  };
});