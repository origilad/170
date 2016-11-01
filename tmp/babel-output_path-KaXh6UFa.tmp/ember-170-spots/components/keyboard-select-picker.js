define('ember-170-spots/components/keyboard-select-picker', ['exports', 'ember', 'ember-170-spots/components/select-picker', 'ember-cli-select-picker/mixins/item-cursor'], function (exports, _ember, _ember170SpotsComponentsSelectPicker, _emberCliSelectPickerMixinsItemCursor) {

  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var KEY_UP = 38;
  var KEY_DOWN = 40;

  exports['default'] = _ember170SpotsComponentsSelectPicker['default'].extend(_emberCliSelectPickerMixinsItemCursor['default'], {
    layoutName: 'components/select-picker',
    classNames: ['select-picker', 'keyboard-select-picker'],

    didInsertElement: function didInsertElement() {
      this.$().on('keydown.' + this.get('elementId'), _ember['default'].run.bind(this, 'handleKeyPress'));
    },

    willDestroyElement: function willDestroyElement() {
      this.$().off('keydown.' + this.get('elementId'));
    },

    focusActiveItem: function focusActiveItem() {
      this.$('[data-itemid=' + this.get('activeItem.itemId') + ']').focus();
    },

    handleKeyPress: function handleKeyPress(e) {
      var _this = this;

      var actionName = (function () {
        switch (e.which) {
          case KEY_DOWN:
            return 'activeNext';
          case KEY_UP:
            return 'activePrev';
          case KEY_ESC:
            return 'closeDropdown';
          case KEY_ENTER:
            return _this.get('showDropdown') ? 'selectActiveItem' : 'openDropdown';
          default:
            return null;
        }
      })();

      if (actionName) {
        e.preventDefault();
        _ember['default'].run(function () {
          _this.send(actionName);
        });
        this.focusActiveItem();
        return false;
      }

      return true;
    }
  });
});