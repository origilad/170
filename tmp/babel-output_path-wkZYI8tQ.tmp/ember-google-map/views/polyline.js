define('ember-google-map/views/polyline', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/views/core'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapViewsCore) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;
  var on = _ember['default'].on;

  /**
   * @class GoogleMapPolylineView
   * @extends GoogleMapCoreView
   */
  exports['default'] = _emberGoogleMapViewsCore['default'].extend({
    googleFQCN: 'google.maps.Polyline',

    templateName: 'google-map/polyline',

    googleProperties: computed({
      get: function get() {
        return {
          isClickable: { name: 'clickable', optionOnly: true },
          isVisible: { name: 'visible', event: 'visible_changed' },
          isDraggable: { name: 'draggable', event: 'draggable_changed' },
          isEditable: { name: 'editable', event: 'editable_changed' },
          isGeodesic: { name: 'geodesic', optionOnly: true },
          icons: { optionOnly: true },
          zIndex: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.integer },
          map: { readOnly: true },
          strokeColor: { optionOnly: true },
          strokeWeight: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number },
          strokeOpacity: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number }
        };
      }
    }),

    // aliased from controller so that if they are not defined they use the values from the controller
    strokeColor: alias('controller.strokeColor'),
    strokeWeight: alias('controller.strokeWeight'),
    strokeOpacity: alias('controller.strokeOpacity'),
    zIndex: alias('controller.zIndex'),
    isVisible: alias('controller.isVisible'),
    isDraggable: alias('controller.isDraggable'),
    isClickable: alias('controller.isClickable'),
    isEditable: alias('controller.isEditable'),
    isGeodesic: alias('controller.isGeodesic'),
    icons: alias('controller.icons'),

    initGoogleObject: on('didInsertElement', function () {
      // force the creation of the polyline
      if (_emberGoogleMapCoreHelpers['default'].hasGoogleLib() && !this.get('googleObject')) {
        this.createGoogleObject({ path: this.get('controller._path.googleArray') });
      }
    })
  });
});