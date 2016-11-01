define('ember-170-spots/app', ['exports', 'ember', 'ember-170-spots/resolver', 'ember-load-initializers', 'ember-170-spots/config/environment'], function (exports, _ember, _ember170SpotsResolver, _emberLoadInitializers, _ember170SpotsConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ember170SpotsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ember170SpotsConfigEnvironment['default'].podModulePrefix,
    Resolver: _ember170SpotsResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ember170SpotsConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});