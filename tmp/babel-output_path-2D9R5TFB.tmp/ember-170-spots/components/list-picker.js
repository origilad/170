define('ember-170-spots/components/list-picker', ['exports', 'ember', 'ember-cli-select-picker/mixins/select-picker'], function (exports, _ember, _emberCliSelectPickerMixinsSelectPicker) {

  var I18nProps = _ember['default'].I18n && _ember['default'].I18n.TranslateableProperties || {};

  exports['default'] = _ember['default'].Component.extend(_emberCliSelectPickerMixinsSelectPicker['default'], I18nProps, {
    classNames: ['select-picker', 'list-picker'],
    selectAllLabel: 'Select All',
    selectNoneLabel: 'Select None',
    nativeMobile: false
  });
});