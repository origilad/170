define('ember-google-map/controllers/polygon', ['exports', 'ember', 'ember-google-map/controllers/polyline'], function (exports, _ember, _emberGoogleMapControllersPolyline) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapPolygonController
   * @extends GoogleMapPolylineController
   */
  exports['default'] = _emberGoogleMapControllersPolyline['default'].extend({
    fillColor: alias('model.fillColor'),
    fillOpacity: alias('model.fillOpacity')
  });
});