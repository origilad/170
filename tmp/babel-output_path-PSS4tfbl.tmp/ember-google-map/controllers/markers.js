define('ember-google-map/controllers/markers', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapMarkersController
   * @extends Ember.ArrayController
   */
  exports['default'] = _ember['default'].ArrayController.extend({
    itemController: computed.alias('parentController.markerController'),
    model: computed.alias('parentController.markers')
  });
});