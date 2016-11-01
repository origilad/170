define('ember-google-map/controllers/circles', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;

  /**
   * @class GoogleMapCirclesController
   * @extends Ember.ArrayController
   */
  exports['default'] = _ember['default'].ArrayController.extend({
    itemController: computed.alias('parentController.circleController'),
    model: computed.alias('parentController.circles')
  });
});