define('ember-google-map/components/google-map', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/mixins/google-object'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapMixinsGoogleObject) {
  /* globals google */
  'use strict';

  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  var on = _ember['default'].on;
  var observer = _ember['default'].observer;
  var fmt = _ember['default'].String.fmt;
  var forEach = _ember['default'].EnumerableUtils.forEach;
  var getProperties = _ember['default'].getProperties;
  var get$ = _ember['default'].get;
  var dummyCircle;

  var VALID_FIT_BOUND_TYPES = ['markers', 'infoWindows', 'circles', 'polylines', 'polygons'];

  function getDummyCircle(center, radius) {
    if (radius == null) {
      radius = get$(center, 'radius');
    }
    if (!(center instanceof google.maps.LatLng)) {
      center = _emberGoogleMapCoreHelpers['default']._latLngToGoogle(center);
    }
    if (dummyCircle) {
      dummyCircle.setCenter(center);
      dummyCircle.setRadius(radius);
    } else {
      dummyCircle = new google.maps.Circle({ center: center, radius: radius });
    }
    return dummyCircle;
  }

  function collectCoordsOf(type, array, items) {
    if (['markers', 'infoWindows'].indexOf(type) !== -1) {
      // handle simple types
      return array.reduce(function (previous, item) {
        var coords = getProperties(item, 'lat', 'lng');
        if (coords.lat != null && coords.lng != null) {
          previous.push(coords);
        }
        return previous;
      }, items || []);
    } else if (type === 'circles') {
      // handle circles
      return array.reduce(function (previous, item) {
        var opt = getProperties(item, 'lat', 'lng', 'radius'),
            bounds;
        if (opt.lat != null && opt.lng != null && opt.radius != null) {
          bounds = getDummyCircle(opt).getBounds();
          previous.push(_emberGoogleMapCoreHelpers['default']._latLngFromGoogle(bounds.getNorthEast()));
          previous.push(_emberGoogleMapCoreHelpers['default']._latLngFromGoogle(bounds.getSouthWest()));
        }
        return previous;
      }, items || []);
    } else if (['polylines', 'polygons']) {
      // handle complex types
      return array.reduce(function (previous, item) {
        return get$(item, '_path').reduce(function (previous, item) {
          var coords = getProperties(item, 'lat', 'lng');
          if (coords.lat != null && coords.lng != null) {
            previous.push(coords);
          }
          return previous;
        }, items || []);
      }, items || []);
    }
  }

  function obj(o) {
    return _ember['default'].Object.create(o);
  }

  var MAP_TYPES = _ember['default'].A([obj({ id: 'road', label: 'road' }), obj({ id: 'satellite', label: 'satellite' }), obj({ id: 'terrain', label: 'terrain' }), obj({ id: 'hybrid', label: 'hybrid' })]);

  exports.MAP_TYPES = MAP_TYPES;

  var PLACE_TYPES = _ember['default'].A([obj({ id: _emberGoogleMapCoreHelpers['default'].PLACE_TYPE_ADDRESS, label: 'address' }), obj({ id: _emberGoogleMapCoreHelpers['default'].PLACE_TYPE_LOCALITY, label: 'locality' }), obj({ id: _emberGoogleMapCoreHelpers['default'].PLACE_TYPE_ADMIN_REGION, label: 'administrative region' }), obj({ id: _emberGoogleMapCoreHelpers['default'].PLACE_TYPE_BUSINESS, label: 'business' })]);

  exports.PLACE_TYPES = PLACE_TYPES;

  /**
   * @class GoogleMapComponent
   * @extends Ember.Component
   * @uses GoogleObjectMixin
   */
  exports['default'] = _ember['default'].Component.extend(_emberGoogleMapMixinsGoogleObject['default'], {
    googleFQCN: 'google.maps.Map',

    classNames: ['google-map'],

    /**
     * Defines all properties bound to the google map object
     * @property googleProperties
     * @type {Object}
     */
    googleProperties: {
      zoom: { event: 'zoom_changed', cast: _emberGoogleMapCoreHelpers['default'].cast.integer },
      type: {
        name: 'mapTypeId',
        event: 'maptypeid_changed',
        toGoogle: _emberGoogleMapCoreHelpers['default']._typeToGoogle,
        fromGoogle: _emberGoogleMapCoreHelpers['default']._typeFromGoogle
      },
      'lat,lng': {
        name: 'center',
        event: 'center_changed',
        toGoogle: _emberGoogleMapCoreHelpers['default']._latLngToGoogle,
        fromGoogle: _emberGoogleMapCoreHelpers['default']._latLngFromGoogle
      }
      /**
       * available options (prepend with `gopt_` to use):
       * `backgroundColor`, `disableDefaultUI`, `disableDoubleClickZoom`, `draggable`, `keyboardShortcuts`,
       * `mapTypeControl`, `maxZoom`, `minZoom`, `overviewMapControl`, `panControl`, `rotateControl`, `scaleControl`,
       * `scrollwheel`, `streetViewControl`, `zoomControl`
       */
    },

    /**
     * @inheritDoc
     */
    googleEvents: {},

    /**
     * Our google map object
     * @property googleObject
     * @type {google.maps.Map}
     * @private
     */
    googleObject: null,

    /**
     * Always auto-fit bounds
     * @property alwaysAutoFitBounds
     * @type {boolean}
     */
    alwaysAutoFitBounds: false,

    /**
     * Auto fit bounds to type of items
     * @property autoFitBounds
     * @type {boolean|string}
     */
    autoFitBounds: false,

    /**
     * Fit bounds to view all coordinates
     * @property fitBoundsArray
     * @type {Array.<{lat: number, lng: number}>}
     */
    fitBoundsArray: computed('autoFitBounds', '_markers.[]', '_infoWindow.[]', '_polylines.@each._path.[]', '_polygons.@each._path.[]', '_circles.[]', {
      get: function get() {
        var auto, value;
        if (this._fixedFitBoundsArray) {
          value = this._fixedFitBoundsArray;
        } else {
          // here comes our computation
          auto = this.get('autoFitBounds');
          if (auto) {
            auto = auto === true ? VALID_FIT_BOUND_TYPES : auto.split(',');
            value = [];
            forEach(auto, function (type) {
              collectCoordsOf(type, this.get('_' + type), value);
            }, this);
          } else {
            value = null;
          }
        }
        return value;
      },
      set: function set(key, value) {
        this._fixedFitBoundsArray = value;
        return value;
      }
    }),

    /**
     * Initial center's latitude of the map
     * @property lat
     * @type {Number}
     */
    lat: 0,

    /**
     * Initial center's longitude of the map
     * @property lng
     * @type {Number}
     */
    lng: 0,

    /**
     * Initial zoom of the map
     * @property zoom
     * @type {Number}
     * @default 5
     */
    zoom: 5,

    /**
     * Initial type of the map
     * @property type
     * @type {String}
     * @enum ['road', 'hybrid', 'terrain', 'satellite']
     * @default 'road'
     */
    type: 'road',

    /**
     * List of markers to handle/show on the map
     * @property markers
     * @type {Array.<{lat: Number, lng: Number, title: String}>}
     */
    markers: null,

    /**
     * The array controller holding the markers
     * @property _markers
     * @type {Ember.ArrayController}
     * @private
     */
    _markers: computed({
      get: function get() {
        return this.container.lookupFactory('controller:google-map/markers').create({
          parentController: this
        });
      }
    }),

    /**
     * Controller to use for each marker
     * @property markerController
     * @type {String}
     * @default 'google-map/marker'
     */
    markerController: 'google-map/marker',

    /**
     * View to use for each marker
     * @property markerViewClass
     * @type {String}
     * @default 'google-map/marker'
     */
    markerViewClass: 'google-map/marker',

    /**
     * Info-window template name to use for each marker
     * @property markerInfoWindowTemplateName
     * @type {String}
     * @default 'google-map/info-window'
     */
    markerInfoWindowTemplateName: 'google-map/info-window',

    /**
     * Whether the markers have an info-window by default
     * @property markerHasInfoWindow
     * @type {Boolean}
     * @default true
     */
    markerHasInfoWindow: true,

    /**
     * List of polylines to handle/show on the map
     * @property polylines
     * @type {Array.<{path: Array.<{lat: Number, lng: Number}>>}
     */
    polylines: null,

    /**
     * The array controller holding the polylines
     * @property _polylines
     * @type {Ember.ArrayController}
     * @private
     */
    _polylines: computed({
      get: function get() {
        return this.container.lookupFactory('controller:google-map/polylines').create({
          parentController: this
        });
      }
    }),

    /**
     * Controller to use for each polyline
     * @property polylineController
     * @type {String}
     * @default 'google-map/polyline'
     */
    polylineController: 'google-map/polyline',

    /**
     * Controller to use for each polyline's path
     * @property polylinePathController
     * @type {String}
     * @default 'google-map/polyline-path'
     */
    polylinePathController: 'google-map/polyline-path',

    /**
     * View to use for each polyline
     * @property polylineViewClass
     * @type {String}
     * @default 'google-map/polyline'
     */
    polylineViewClass: 'google-map/polyline',

    /**
     * List of polygons to handle/show on the map
     * @property polygons
     * @type {Array.<{path: Array.<{lat: Number, lng: Number}>>}
     */
    polygons: null,

    /**
     * The array controller holding the polygons
     * @property _polygons
     * @type {Ember.ArrayController}
     * @private
     */
    _polygons: computed({
      get: function get() {
        return this.container.lookupFactory('controller:google-map/polygons').create({
          parentController: this
        });
      }
    }),

    /**
     * Controller to use for each polygon
     * @property polygonController
     * @type {String}
     * @default 'google-map/polygon'
     */
    polygonController: 'google-map/polygon',

    /**
     * Controller to use for each polygon's path
     * @property polygonPathController
     * @type {String}
     * @default 'google-map/polygon-path'
     */
    polygonPathController: 'google-map/polygon-path',

    /**
     * View to use for each polygon
     * @property polygonViewClass
     * @type {String}
     * @default 'google-map/polygon'
     */
    polygonViewClass: 'google-map/polygon',

    /**
     * List of circles to handle/show on the map
     * @property circles
     * @type {Array.<{lat: Number, lng: Number, radius: Number}>}
     */
    circles: null,

    /**
     * The array controller holding the circles
     * @property _circles
     * @type {Ember.ArrayController}
     * @private
     */
    _circles: computed({
      get: function get() {
        return this.container.lookupFactory('controller:google-map/circles').create({
          parentController: this
        });
      }
    }),

    /**
     * Controller to use for each circle
     * @property circleController
     * @type {String}
     * @default 'google-map/circle'
     */
    circleController: 'google-map/circle',

    /**
     * View to use for each circle
     * @property circleViewClass
     * @type {String}
     * @default 'google-map/circle'
     */
    circleViewClass: 'google-map/circle',

    /**
     * Array of al info-windows to handle/show (independent from the markers' info-windows)
     * @property infoWindows
     * @type {Array.<{lat: Number, lng: Number, title: String, description: String}>}
     */
    infoWindows: null,

    /**
     * The array controller holding the info-windows
     * @property _infoWindows
     * @type {Ember.ArrayController}
     * @private
     */
    _infoWindows: computed({
      get: function get() {
        return this.container.lookupFactory('controller:google-map/info-windows').create({
          parentController: this
        });
      }
    }),

    /**
     * Controller for each info-window
     * @property infoWindowController
     * @type {String}
     * @default 'google-map/info-window'
     */
    infoWindowController: 'google-map/info-window',

    /**
     * View for each info-window
     * @property infoWindowViewClass
     * @type {String}
     * @default 'google-map/info-window'
     */
    infoWindowViewClass: 'google-map/info-window',

    /**
     * Template for each info-window
     * @property infoWindowTemplateName
     * @type {String}
     * @default 'google-map/info-window'
     */
    infoWindowTemplateName: 'google-map/info-window',

    /**
     * The google map object
     * @property map
     * @type {google.maps.Map}
     */
    map: computed.oneWay('googleObject'),

    /**
     * Schedule an auto-fit of the bounds
     *
     * @method _scheduleAutoFitBounds
     */
    _scheduleAutoFitBounds: function _scheduleAutoFitBounds() {
      run.schedule('afterRender', this, function () {
        run.debounce(this, '_fitBounds', 200);
      });
    },

    /**
     * Observes the length of the autoFitBounds array
     *
     * @method _observesAutoFitBoundLength
     * @private
     */
    _observesAutoFitBoundLength: on('init', observer('fitBoundsArray.length', function () {
      if (this.get('alwaysAutoFitBounds')) {
        this._scheduleAutoFitBounds();
      }
    })),

    /**
     * Fit the bounds to contain given coordinates
     *
     * @method _fitBounds
     */
    _fitBounds: function _fitBounds() {
      var map, bounds, coords;
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      map = this.get('googleObject');
      if (this._state !== 'inDOM' || !map) {
        this._scheduleAutoFitBounds(coords);
        return;
      }
      coords = this.get('fitBoundsArray');
      if (!coords) {
        return;
      }
      if (_ember['default'].isArray(coords)) {
        // it's an array of lat,lng
        coords = coords.slice();
        if (get$(coords, 'length')) {
          bounds = new google.maps.LatLngBounds(_emberGoogleMapCoreHelpers['default']._latLngToGoogle(coords.shift()));
          forEach(coords, function (point) {
            bounds.extend(_emberGoogleMapCoreHelpers['default']._latLngToGoogle(point));
          });
        } else {
          return;
        }
      } else {
        // it's a bound object
        bounds = _emberGoogleMapCoreHelpers['default']._boundsToGoogle(coords);
      }
      if (bounds) {
        // finally make our map to fit
        map.fitBounds(bounds);
      }
    },

    /**
     * Initialize the map
     */
    initGoogleMap: on('didInsertElement', function () {
      var canvas;
      this.destroyGoogleMap();
      if (_emberGoogleMapCoreHelpers['default'].hasGoogleLib()) {
        canvas = this.$('div.map-canvas')[0];
        this.createGoogleObject(canvas, null);
        this._scheduleAutoFitBounds();
      }
    }),

    /**
     * Destroy the map
     */
    destroyGoogleMap: on('willDestroyElement', function () {
      if (this.get('googleObject')) {
        _ember['default'].debug(fmt('[google-map] destroying %@', this.get('googleName')));
        this.set('googleObject', null);
      }
    })
  });
});