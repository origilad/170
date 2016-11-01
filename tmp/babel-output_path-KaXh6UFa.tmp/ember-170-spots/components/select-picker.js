define('ember-170-spots/components/select-picker', ['exports', 'ember', 'ember-cli-select-picker/mixins/select-picker'], function (exports, _ember, _emberCliSelectPickerMixinsSelectPicker) {

  var I18nProps = _ember['default'].I18n && _ember['default'].I18n.TranslateableProperties || {};

  exports['default'] = _ember['default'].Component.extend(_emberCliSelectPickerMixinsSelectPicker['default'], I18nProps, {

    nothingSelectedMessage: 'Nothing Selected',
    multipleSelectedMessage: '%@ items selected',
    selectAllLabel: 'All',
    selectNoneLabel: 'None',

    nativeMobile: true,

    classNames: ['select-picker', 'btn-group'],
    buttonClass: 'btn-default',

    badgeEnabled: _ember['default'].computed.and('showBadge', 'multiple'),

    selectionBadge: _ember['default'].computed('selection.length', 'badgeEnabled', function () {
      var enabled = this.get('badgeEnabled');
      var selected = this.get('selection.length');
      return enabled && selected && selected !== 0 ? selected : '';
    }),

    setupDom: _ember['default'].on('didInsertElement', function () {
      var id = this.get('elementId');
      _ember['default'].run.scheduleOnce('afterRender', this, this.updateDropUp);
      $(document).on('click.' + id, _ember['default'].run.bind(this, this.hideDropdownMenu)).on('touchstart.' + id, _ember['default'].run.bind(this, this.hideDropdownMenu)).on('scroll.' + id, _ember['default'].run.bind(this, this.updateDropUp)).on('resize.' + id, _ember['default'].run.bind(this, this.updateDropUp));
    }),

    hideDropdownMenu: function hideDropdownMenu(evt) {
      if (this.get('keepDropdownOpen')) {
        this.set('keepDropdownOpen', false);
        return;
      }
      if (this.element && !$.contains(this.element, evt.target)) {
        this.send('closeDropdown');
      }
    },

    updateDropUp: function updateDropUp() {
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var buttonOffset = this.$().offset().top;
      var buttonHeight = this.$().height();
      var menuHeight = this.$('.dropdown-menu').height();
      var viewportOffset = buttonOffset - scrollTop;
      var menuBottom = viewportOffset + buttonHeight + menuHeight;
      this.set('isDropUp', menuBottom > windowHeight);
    },

    teardownDom: _ember['default'].on('willDestroyElement', function () {
      $(document).off('.' + this.get('elementId'));
    }),

    actions: {
      showHide: function showHide() {
        this.toggleProperty('showDropdown');
      },

      openDropdown: function openDropdown() {
        this.set('showDropdown', true);
      },

      closeDropdown: function closeDropdown() {
        this.set('showDropdown', false);
      }
    }
  });
});