define('ember-google-map/views/core', ['exports', 'ember', 'ember-google-map/core/helpers', 'ember-google-map/mixins/google-object', 'ember-google-map/components/google-map'], function (exports, _ember, _emberGoogleMapCoreHelpers, _emberGoogleMapMixinsGoogleObject, _emberGoogleMapComponentsGoogleMap) {
  'use strict';

  var computed = _ember['default'].computed;
  var oneWay = computed.oneWay;
  var on = _ember['default'].on;

  /**
   * @class GoogleMapCoreView
   * @extends Ember.View
   * @uses GoogleObjectMixin
   */
  exports['default'] = _ember['default'].View.extend(_emberGoogleMapMixinsGoogleObject['default'], {
    googleMapComponent: computed({
      get: function get() {
        var parent = this.get('parentView');
        while (parent && !(parent instanceof _emberGoogleMapComponentsGoogleMap['default'])) {
          parent = parent.get('parentView');
        }
        return parent;
      }
    }),

    googleEventsTarget: oneWay('googleMapComponent.targetObject'),

    map: oneWay('googleMapComponent.map'),

    controller: oneWay('context'),

    initGoogleObject: on('didInsertElement', function () {
      // force the creation of the object
      if (_emberGoogleMapCoreHelpers['default'].hasGoogleLib() && !this.get('googleObject')) {
        this.createGoogleObject();
      }
    }),

    destroyGoogleObject: on('willDestroyElement', function () {
      var object = this.get('googleObject');
      if (object) {
        // detach from the map
        object.setMap(null);
        this.set('googleObject', null);
      }
    })
  });
});