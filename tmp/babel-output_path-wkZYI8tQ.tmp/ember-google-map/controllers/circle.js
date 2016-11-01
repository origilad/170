define('ember-google-map/controllers/circle', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapCircleController
   * @extends Ember.Controller
   */
  exports['default'] = _ember['default'].Controller.extend({
    radius: alias('model.radius'),
    zIndex: alias('model.zIndex'),
    isVisible: alias('model.isVisible'),
    isDraggable: alias('model.isDraggable'),
    isClickable: alias('model.isClickable'),
    isEditable: alias('model.isEditable'),
    strokeColor: alias('model.strokeColor'),
    strokeOpacity: alias('model.strokeOpacity'),
    strokeWeight: alias('model.strokeWeight'),
    fillColor: alias('model.fillColor'),
    fillOpacity: alias('model.fillOpacity'),
    lat: alias('model.lat'),
    lng: alias('model.lng')
  });
});