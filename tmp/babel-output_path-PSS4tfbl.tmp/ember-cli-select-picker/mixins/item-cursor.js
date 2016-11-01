define('ember-cli-select-picker/mixins/item-cursor', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    activeCursor: null,
    previousActiveIndex: 0,

    updateActiveItem: _ember['default'].observer('activeCursor', 'contentList.length', function () {
      var previousActiveIndex = this.get('previousActiveIndex');
      var activeIndex = this.get('activeIndex');
      if (_ember['default'].typeOf(activeIndex) !== 'number') {
        return;
      }
      this.set('contentList.' + previousActiveIndex + '.active', false);
      this.set('contentList.' + activeIndex + '.active', true);
      this.set('previousActiveIndex', activeIndex);
    }),

    activeIndex: _ember['default'].computed('activeCursor', 'contentList.length', function () {
      var cursor = this.get('activeCursor');
      if (_ember['default'].isNone(cursor)) {
        return null;
      }
      var len = this.get('contentList.length');
      return (cursor % len + len) % len;
    }),

    activeItem: _ember['default'].computed('activeIndex', 'contentList.[]', function () {
      return this.get('contentList').objectAt(this.get('activeIndex'));
    }),

    actions: {
      activeNext: function activeNext() {
        if (_ember['default'].isNone(this.get('activeCursor'))) {
          this.set('activeCursor', 0);
        } else {
          this.incrementProperty('activeCursor');
        }
      },

      activePrev: function activePrev() {
        if (_ember['default'].isNone(this.get('activeCursor'))) {
          this.set('activeCursor', -1);
        } else {
          this.decrementProperty('activeCursor');
        }
      },

      selectActiveItem: function selectActiveItem() {
        var item = this.get('activeItem');
        if (_ember['default'].isPresent(item)) {
          this.send('selectItem', item);
        }
      }
    }
  });
});