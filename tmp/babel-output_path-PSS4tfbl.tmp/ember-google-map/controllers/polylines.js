define('ember-google-map/controllers/polylines', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapPolylinesController
   * @extends Ember.ArrayController
   */
  exports['default'] = _ember['default'].ArrayController.extend({
    itemController: computed.alias('parentController.polylineController'),
    model: computed.alias('parentController.polylines'),
    pathController: computed.alias('parentController.polylinePathController')
  });
});