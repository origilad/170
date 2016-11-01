define('ember-google-map/views/polygon', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/views/polyline'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapViewsPolyline) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapPolygonView
   * @extends GoogleMapPolylineView
   */
  exports['default'] = _emberGoogleMapViewsPolyline['default'].extend({
    googleFQCN: 'google.maps.Polygon',

    googleProperties: computed({
      get: function get() {
        return _ember['default'].merge(this._super(), {
          fillColor: { optionOnly: true },
          fillOpacity: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number }
        });
      }
    }),

    // aliased from controller so that if they are not defined they use the values from the controller
    fillColor: alias('controller.fillColor'),
    fillOpacity: alias('controller.fillOpacity')
  });
});