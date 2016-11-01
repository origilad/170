define('ember-google-map/controllers/info-window', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapInfoWindowController
   * @extends Ember.Controller
   */
  exports['default'] = _ember['default'].Controller.extend({
    templateName: alias('model.templateName'),
    zIndex: alias('model.zIndex'),
    lat: alias('model.lat'),
    lng: alias('model.lng'),
    isVisible: alias('model.isVisible'),
    title: alias('model.title'),
    description: alias('model.description')
  });
});