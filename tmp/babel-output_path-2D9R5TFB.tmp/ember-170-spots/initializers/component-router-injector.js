define('ember-170-spots/initializers/component-router-injector', ['exports'], function (exports) {
  exports.initialize = initialize;
  // app/initializers/component-router-injector.js

  function initialize(application) {
    // Injects all Ember components with a router object:
    application.inject('component', 'router', 'router:main');
  }

  exports['default'] = {
    name: 'component-router-injector',
    initialize: initialize
  };
});