define('ember-170-spots/helpers/app-version', ['exports', 'ember', 'ember-170-spots/config/environment'], function (exports, _ember, _ember170SpotsConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _ember170SpotsConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});