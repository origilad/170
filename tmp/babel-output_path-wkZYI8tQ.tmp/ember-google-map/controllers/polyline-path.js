define('ember-google-map/controllers/polyline-path', ['exports', 'ember', 'ember-google-map/mixins/google-array', 'ember-google-map/core/helpers'], function (exports, _ember, _emberGoogleMapMixinsGoogleArray, _emberGoogleMapCoreHelpers) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapPolylinePathController
   * @extends Ember.ArrayController
   */
  exports['default'] = _ember['default'].ArrayController.extend(_emberGoogleMapMixinsGoogleArray['default'], {
    model: computed.alias('parentController.path'),
    googleItemFactory: _emberGoogleMapCoreHelpers['default']._latLngToGoogle,
    emberItemFactory: function emberItemFactory(googleLatLng) {
      return _ember['default'].Object.create(_emberGoogleMapCoreHelpers['default']._latLngFromGoogle(googleLatLng));
    },
    observeEmberProperties: ['lat', 'lng']
  });
});