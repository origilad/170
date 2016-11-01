define('ember-google-map/controllers/polygon-path', ['exports', 'ember-google-map/controllers/polyline-path'], function (exports, _emberGoogleMapControllersPolylinePath) {
  'use strict';

  /**
   * @class GoogleMapPolygonPathController
   * @extends GoogleMapPolylinePathController
   */
  exports['default'] = _emberGoogleMapControllersPolylinePath['default'].extend();
});