define('ember-170-spots/tests/helpers/start-app', ['exports', 'ember', 'ember-170-spots/app', 'ember-170-spots/config/environment'], function (exports, _ember, _ember170SpotsApp, _ember170SpotsConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _ember170SpotsConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _ember170SpotsApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});