define('ember-170-spots/tests/helpers/resolver', ['exports', 'ember-170-spots/resolver', 'ember-170-spots/config/environment'], function (exports, _ember170SpotsResolver, _ember170SpotsConfigEnvironment) {

  var resolver = _ember170SpotsResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ember170SpotsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ember170SpotsConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});