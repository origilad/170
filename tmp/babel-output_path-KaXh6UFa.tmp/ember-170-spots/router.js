define('ember-170-spots/router', ['exports', 'ember', 'ember-170-spots/config/environment'], function (exports, _ember, _ember170SpotsConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ember170SpotsConfigEnvironment['default'].locationType,
    rootURL: _ember170SpotsConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('map');

    this.route('adventure-analytics');
    this.route('travel-log');
    this.route('logged-adventure');
    this.route('log-new-adventure');
  });

  exports['default'] = Router;
});