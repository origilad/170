define('ember-170-spots/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-170-spots/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ember170SpotsConfigEnvironment) {
  var _config$APP = _ember170SpotsConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});