define('ember-google-map/controllers/polyline', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapPolylineController
   * @extends Ember.Controller
   */
  exports['default'] = _ember['default'].Controller.extend({
    pathController: alias('parentController.pathController'),

    _path: computed('path', 'pathController', {
      get: function get() {
        return this.container.lookupFactory('controller:' + this.get('pathController')).create({
          parentController: this
        });
      }
    }),

    path: alias('model.path'),
    strokeColor: alias('model.strokeColor'),
    strokeWeight: alias('model.strokeWeight'),
    strokeOpacity: alias('model.strokeOpacity'),
    zIndex: alias('model.zIndex'),
    isVisible: alias('model.isVisible'),
    isDraggable: alias('model.isDraggable'),
    isClickable: alias('model.isClickable'),
    isEditable: alias('model.isEditable'),
    isGeodesic: alias('model.isGeodesic'),
    icons: alias('model.icons')
  });
});