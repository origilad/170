define('ember-google-map/views/info-window', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/views/core', 'ember-google-map/views/marker'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapViewsCore, _emberGoogleMapViewsMarker) {
  'use strict';

  var observer = _ember['default'].observer;
  var run = _ember['default'].run;
  var on = _ember['default'].on;
  var scheduleOnce = _ember['default'].run.scheduleOnce;
  var computed = _ember['default'].computed;
  var alias = computed.alias;
  var oneWay = computed.oneWay;

  /**
   * @class GoogleMapInfoWindowView
   * @extends GoogleMapCoreView
   */
  exports['default'] = _emberGoogleMapViewsCore['default'].extend({
    classNames: ['google-info-window'],

    googleFQCN: 'google.maps.InfoWindow',

    // will be either the marker using us, or the component if this is a detached info-window
    templateName: computed.any('controller.templateName', 'parentView.infoWindowTemplateName'),

    googleProperties: {
      zIndex: { event: 'zindex_changed', cast: _emberGoogleMapCoreHelpers['default'].cast.integer },
      map: { readOnly: true },
      'lat,lng': {
        name: 'position',
        event: 'position_changed',
        toGoogle: _emberGoogleMapCoreHelpers['default']._latLngToGoogle,
        fromGoogle: _emberGoogleMapCoreHelpers['default']._latLngFromGoogle
      }
    },

    isMarkerInfoWindow: computed('parentView', {
      get: function get() {
        return this.get('parentView') instanceof _emberGoogleMapViewsMarker['default'];
      }
    }),

    _coreGoogleEvents: ['closeclick'],

    // aliased from controller so that if they are not defined they use the values from the controller
    zIndex: alias('controller.zIndex'),
    lat: alias('controller.lat'),
    lng: alias('controller.lng'),
    anchor: oneWay('parentView.infoWindowAnchor'),

    visible: computed('parentView.isInfoWindowVisible', 'controller.isVisible', {
      get: function get() {
        var value,
            isMarkerIW = this.get('isMarkerInfoWindow');
        if (isMarkerIW) {
          value = this.get('parentView.isInfoWindowVisible');
        } else {
          value = this.getWithDefault('controller.isVisible', true);
          run(this, 'set', 'controller.isVisible', value);
        }
        return value;
      },
      set: function set(key, value) {
        var isMarkerIW = this.get('isMarkerInfoWindow');
        value = Boolean(value);
        if (isMarkerIW) {
          this.set('parentView.isInfoWindowVisible', value);
        } else {
          this.set('controller.isVisible', value);
        }
        return value;
      }
    }),

    initGoogleObject: on('didInsertElement', function () {
      scheduleOnce('afterRender', this, '_initGoogleInfoWindow');
    }),

    handleInfoWindowVisibility: observer('visible', function () {
      if (this._changingVisible) {
        return;
      }
      var iw = this.get('googleObject');
      if (iw) {
        if (this.get('visible')) {
          iw.open(this.get('map'), this.get('anchor') || undefined);
        } else {
          iw.close();
        }
      }
    }),

    _initGoogleInfoWindow: function _initGoogleInfoWindow() {
      // force the creation of the marker
      if (_emberGoogleMapCoreHelpers['default'].hasGoogleLib() && !this.get('googleObject')) {
        this.createGoogleObject({ content: this._backupViewElement() });
        this.handleInfoWindowVisibility();
      }
    },

    destroyGoogleObject: on('willDestroyElement', function () {
      var infoWindow = this.get('googleObject');
      if (infoWindow) {
        this._changingVisible = true;
        infoWindow.close();
        // detach from the map
        infoWindow.setMap(null);
        // free the content node
        this._restoreViewElement();
        this.set('googleObject', null);
        this._changingVisible = false;
      }
    }),

    _backupViewElement: function _backupViewElement() {
      var element = this.get('element');
      if (!this._placeholderElement) {
        this._placeholderElement = document.createElement(element.nodeName);
        element.parentNode.replaceChild(this._placeholderElement, element);
      }
      return element;
    },

    _restoreViewElement: function _restoreViewElement() {
      var element = this.get('element');
      if (this._placeholderElement) {
        this._placeholderElement.parentNode.replaceChild(element, this._placeholderElement);
        this._placeholderElement = null;
      }
      return element;
    },

    _handleCoreEvent: function _handleCoreEvent(name) {
      if (name === 'closeclick') {
        this._changingVisible = true;
        this.set('visible', false);
        this._changingVisible = false;
      }
    }
  });
});