define('ember-google-map/controllers/marker', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapMarkerController
   * @extends Ember.Controller
   */
  exports['default'] = _ember['default'].Controller.extend({
    title: alias('model.title'),
    description: alias('model.description'),
    opacity: alias('model.opacity'),
    zIndex: alias('model.zIndex'),
    isVisible: alias('model.isVisible'),
    isDraggable: alias('model.isDraggable'),
    isClickable: alias('model.isClickable'),
    isOptimized: alias('model.isOptimized'),
    icon: alias('model.icon'),
    lat: alias('model.lat'),
    lng: alias('model.lng'),
    infoWindowTemplateName: alias('model.infoWindowTemplateName'),
    isInfoWindowVisible: alias('model.isInfoWindowVisible'),
    hasInfoWindow: alias('model.hasInfoWindow')
  });
});