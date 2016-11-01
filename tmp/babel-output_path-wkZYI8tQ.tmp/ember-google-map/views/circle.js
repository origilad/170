define('ember-google-map/views/circle', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/views/core'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapViewsCore) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;

  /**
   * @class GoogleMapCircleView
   * @extends GoogleMapCoreView
   */
  exports['default'] = _emberGoogleMapViewsCore['default'].extend({
    googleFQCN: 'google.maps.Circle',

    googleProperties: {
      isClickable: { name: 'clickable', optionOnly: true },
      isVisible: { name: 'visible', event: 'visible_changed' },
      isDraggable: { name: 'draggable', event: 'draggable_changed' },
      isEditable: { name: 'editable', event: 'editable_changed' },
      radius: { event: 'radius_changed', cast: _emberGoogleMapCoreHelpers['default'].cast.number },
      strokeColor: { optionOnly: true },
      strokeOpacity: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number },
      strokeWeight: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number },
      fillColor: { optionOnly: true },
      fillOpacity: { optionOnly: true, cast: _emberGoogleMapCoreHelpers['default'].cast.number },
      zIndex: { cast: _emberGoogleMapCoreHelpers['default'].cast.integer, optionOnly: true },
      map: { readOnly: true },
      'lat,lng': {
        name: 'center',
        event: 'center_changed',
        toGoogle: _emberGoogleMapCoreHelpers['default']._latLngToGoogle,
        fromGoogle: _emberGoogleMapCoreHelpers['default']._latLngFromGoogle
      }
    },

    // aliased from controller so that if they are not defined they use the values from the controller
    radius: alias('controller.radius'),
    zIndex: alias('controller.zIndex'),
    isVisible: alias('controller.isVisible'),
    isDraggable: alias('controller.isDraggable'),
    isClickable: alias('controller.isClickable'),
    isEditable: alias('controller.isEditable'),
    strokeColor: alias('controller.strokeColor'),
    strokeOpacity: alias('controller.strokeOpacity'),
    strokeWeight: alias('controller.strokeWeight'),
    fillColor: alias('controller.fillColor'),
    fillOpacity: alias('controller.fillOpacity'),
    lat: alias('controller.lat'),
    lng: alias('controller.lng')
  });
});