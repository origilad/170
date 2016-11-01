define('ember-google-map/controllers/info-windows', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapInfoWindowsController
   * @extends Ember.ArrayController
   */
  exports['default'] = _ember['default'].ArrayController.extend({
    itemController: computed.alias('parentController.infoWindowController'),
    model: computed.alias('parentController.infoWindows')
  });
});