define('ember-google-map/controllers/polygons', ['exports', 'ember', 'ember-google-map/controllers/polylines'], function (exports, _ember, _emberGoogleMapControllersPolylines) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapPolygonsController
   * @extends GoogleMapPolylinesController
   */
  exports['default'] = _emberGoogleMapControllersPolylines['default'].extend({
    itemController: computed.alias('parentController.polygonController'),
    model: computed.alias('parentController.polygons'),
    pathController: computed.alias('parentController.polygonPathController')
  });
});