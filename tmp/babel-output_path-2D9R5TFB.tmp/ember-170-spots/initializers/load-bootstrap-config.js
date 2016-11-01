define('ember-170-spots/initializers/load-bootstrap-config', ['exports', 'ember-170-spots/config/environment', 'ember-bootstrap/config'], function (exports, _ember170SpotsConfigEnvironment, _emberBootstrapConfig) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    _emberBootstrapConfig['default'].load(_ember170SpotsConfigEnvironment['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});