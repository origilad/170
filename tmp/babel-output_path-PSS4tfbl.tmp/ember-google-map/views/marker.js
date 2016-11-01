define('ember-google-map/views/marker', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/views/core'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapViewsCore) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = computed.alias;
  var oneWay = computed.oneWay;

  /**
   * @class GoogleMapMarkerView
   * @extends GoogleMapCoreView
   */
  exports['default'] = _emberGoogleMapViewsCore['default'].extend({
    googleFQCN: 'google.maps.Marker',

    googleProperties: {
      isClickable: { name: 'clickable', event: 'clickable_changed' },
      isVisible: { name: 'visible', event: 'visible_changed' },
      isDraggable: { name: 'draggable', event: 'draggable_changed' },
      isOptimized: { name: 'optimized', optionOnly: true },
      title: { event: 'title_changed' },
      opacity: { cast: _emberGoogleMapCoreHelpers['default'].cast.number },
      icon: { event: 'icon_changed' },
      zIndex: { event: 'zindex_changed', cast: _emberGoogleMapCoreHelpers['default'].cast.integer },
      map: { readOnly: true },
      'lat,lng': {
        name: 'position',
        event: 'position_changed',
        toGoogle: _emberGoogleMapCoreHelpers['default']._latLngToGoogle,
        fromGoogle: _emberGoogleMapCoreHelpers['default']._latLngFromGoogle
      }
    },

    _coreGoogleEvents: ['click'],

    // aliased from controller so that if they are not defined they use the values from the controller
    title: alias('controller.title'),
    opacity: alias('controller.opacity'),
    zIndex: alias('controller.zIndex'),
    isVisible: alias('controller.isVisible'),
    isDraggable: alias('controller.isDraggable'),
    isClickable: alias('controller.isClickable'),
    isOptimized: alias('controller.isOptimized'),
    icon: alias('controller.icon'),
    lat: alias('controller.lat'),
    lng: alias('controller.lng'),

    // get the info window template name from the component or own controller
    infoWindowTemplateName: computed.any('controller.infoWindowTemplateName', 'googleMapComponent.markerInfoWindowTemplateName'),

    infoWindowAnchor: oneWay('googleObject'),

    isInfoWindowVisible: alias('controller.isInfoWindowVisible'),

    hasInfoWindow: computed('googleMapComponent.markerHasInfoWindow', 'controller.hasInfoWindow', {
      get: function get() {
        var fromCtrl = this.get('controller.hasInfoWindow');
        if (fromCtrl == null) {
          return Boolean(this.get('googleMapComponent.markerHasInfoWindow'));
        }
        return fromCtrl;
      }
    }),

    /**
     * @inheritDoc
     */
    _handleCoreEvent: function _handleCoreEvent(name) {
      if (name === 'click') {
        this.set('isInfoWindowVisible', true);
      }
    }
  });
});