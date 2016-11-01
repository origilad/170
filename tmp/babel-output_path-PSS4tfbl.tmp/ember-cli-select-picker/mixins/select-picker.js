define('ember-cli-select-picker/mixins/select-picker', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  // Ember Addons need to be coded as if Ember.EXTEND_PROTOTYPES = false
  // Because of this we need to make our own proxy functions to apply as one offs
  // to native arrays.
  var emberArrayFunc = function emberArrayFunc(method) {
    return function (ctx) {
      var props = _ember['default'].Enumerable.mixins[0].properties;
      _ember['default'].assert('Ember.Enumerable has no method ' + method, _ember['default'].typeOf(props[method]) === 'function');

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var result = props[method].apply(_ember['default'].A(ctx), args);
      if (_ember['default'].typeOf(result) === 'array') {
        return _ember['default'].A(result);
      } else {
        return result;
      }
    };
  };
  var _contains = emberArrayFunc('contains');
  var _mapBy = emberArrayFunc('mapBy');
  var _filterBy = emberArrayFunc('filterBy');
  var _findBy = emberArrayFunc('findBy');
  var _uniq = emberArrayFunc('uniq');
  var _compact = emberArrayFunc('compact');

  var selectOneOf = function selectOneOf(someSelected, allSelected, noneSelected) {
    return _ember['default'].computed('hasSelectedItems', 'allItemsSelected', function () {
      if (this.get('allItemsSelected')) {
        return allSelected.call(this);
      } else if (this.get('hasSelectedItems')) {
        return someSelected.call(this);
      } else {
        return noneSelected.call(this);
      }
    });
  };

  var selectOneOfValue = function selectOneOfValue(someSelectedValue, allSelectedValue, noneSelectedValue) {
    return selectOneOf(function () {
      return someSelectedValue;
    }, function () {
      return allSelectedValue;
    }, function () {
      return noneSelectedValue;
    });
  };

  var selectOneOfProperty = function selectOneOfProperty(someSelectedKey, allSelectedKey, noneSelectedKey) {
    return selectOneOf(function () {
      return this.get(someSelectedKey);
    }, function () {
      return this.get(allSelectedKey);
    }, function () {
      return this.get(noneSelectedKey);
    });
  };

  var isAdvancedSearch = function isAdvancedSearch(liveSearch) {
    return _ember['default'].typeOf(liveSearch) === 'string' && liveSearch.toLowerCase() === 'advanced';
  };

  exports['default'] = _ember['default'].Mixin.create({
    liveSearch: false,
    showDropdown: false,
    promptMessage: 'Please select an option',
    prompt: _ember['default'].computed.bool('promptMessage'),

    showNativePrompt: _ember['default'].computed('multiple', 'prompt', function () {
      return !this.get('multiple') && _ember['default'].isPresent(this.get('prompt'));
    }),

    menuButtonId: _ember['default'].computed('elementId', function () {
      return this.get('elementId') + '-dropdown-menu';
    }),

    selectionAsArray: function selectionAsArray() {
      return _ember['default'].makeArray(this.get('selection'));
    },

    contentList: _ember['default'].computed('selection.[]', 'content.[]', 'optionGroupPath', 'optionLabelPath', 'optionValuePath', 'searchFilter', function () {
      // Ember.Select does not include the content prefix for optionGroupPath
      var groupPath = this.get('optionGroupPath');
      // Ember.Select expects optionLabelPath and optionValuePath to have a
      // `content.` prefix
      var labelPath = this.contentPathName('optionLabelPath');
      var valuePath = this.contentPathName('optionValuePath');
      // selection is either an object or an array of object depending on the
      // value of the multiple property. Ember.Select maintains the value
      // property.
      var selection = this.selectionAsArray().map(function (item) {
        return _ember['default'].get(item, valuePath);
      });
      var searchMatcher = this.makeSearchMatcher();

      var result = _compact(_ember['default'].makeArray(this.get('content')).map(function (item, index) {
        var label = _ember['default'].get(item, labelPath);
        var value = _ember['default'].get(item, valuePath);
        var group = groupPath ? _ember['default'].get(item, groupPath) : null;
        if (searchMatcher(group) || searchMatcher(label)) {
          return _ember['default'].Object.create({
            item: item,
            itemId: index,
            group: group,
            label: label,
            value: value,
            selected: _contains(selection, value)
          });
        } else {
          return null;
        }
      }));

      if (_ember['default'].isPresent(result)) {
        result.set('firstObject.first', true);
      }

      return result;
    }),

    nestedGroupContentList: _ember['default'].computed('contentList.[].group', function () {
      var contentList = this.get('contentList');
      var groups = _uniq(_mapBy(contentList, 'group'));
      var results = _ember['default'].A();
      groups.forEach(function (group) {
        results.pushObject(_ember['default'].Object.create({
          name: group,
          items: _filterBy(contentList, 'group', group)
        }));
      });
      return results;
    }),

    contentPathName: function contentPathName(pathName) {
      return this.getWithDefault(pathName, '').substr(8);
    },

    getByContentPath: function getByContentPath(obj, pathName) {
      return _ember['default'].get(obj, this.contentPathName(pathName));
    },

    selectedContentList: _ember['default'].computed.filterBy('contentList', 'selected'),
    unselectedContentList: _ember['default'].computed.setDiff('contentList', 'selectedContentList'),
    hasSelectedItems: _ember['default'].computed.gt('selection.length', 0),
    allItemsSelected: _ember['default'].computed('selection.length', 'content.length', function () {
      return _ember['default'].isEqual(this.get('selection.length'), this.get('content.length'));
    }),

    glyphiconClass: selectOneOfValue('glyphicon-minus', 'glyphicon-ok', ''),
    selectAllNoneLabel: selectOneOfProperty('selectNoneLabel', 'selectNoneLabel', 'selectAllLabel'),

    makeSearchMatcher: function makeSearchMatcher() {
      var searchFilter = this.get('searchFilter');
      // item can be null, string, or SafeString.
      // SafeString does not have toLowerCase() so use toString() to
      // normalize it.
      if (_ember['default'].isEmpty(searchFilter)) {
        return function () {
          return true; // Show all
        };
      } else if (isAdvancedSearch(this.get('liveSearch'))) {
          searchFilter = new RegExp(searchFilter.split('').join('.*'), 'i');
          return function (item) {
            if (_ember['default'].isNone(item)) {
              return false;
            } else {
              return searchFilter.test(item.toString());
            }
          };
        } else {
          searchFilter = searchFilter.toLowerCase();
          return function (item) {
            if (_ember['default'].isNone(item)) {
              return false;
            } else {
              return item.toString().toLowerCase().indexOf(searchFilter) >= 0;
            }
          };
        }
    },

    selectionLabels: _ember['default'].computed.mapBy('selectedContentList', 'label'),

    selectionSummary: _ember['default'].computed('selectionLabels.[]', 'nothingSelectedMessage', 'multipleSelectedMessage', 'summaryMessage', 'summaryMessageKey', function () {
      var selection = this.get('selectionLabels');
      var count = selection.get('length');
      var messageKey = this.get('summaryMessageKey');
      var message = this.get('summaryMessage');
      if (_ember['default'].I18n && _ember['default'].isPresent(messageKey)) {
        // TODO: Allow an enablePrompt="false" feature
        if (count === 0) {
          return this.get('nothingSelectedMessage');
        }
        var item = selection.get('firstObject');
        var translation = _ember['default'].I18n.t(messageKey, {
          count: count,
          item: item,
          list: selection.join(', ')
        });
        // I18n is returning a string that's been escaped, we don't want the
        // string to get escaped again.
        return _ember['default'].String.htmlSafe(translation);
      } else if (_ember['default'].isPresent(message)) {
        return message;
      } else {
        switch (count) {
          case 0:
            return this.get('nothingSelectedMessage');
          case 1:
            return selection.get('firstObject');
          default:
            return _ember['default'].String.fmt(this.get('multipleSelectedMessage'), count, selection.get('firstObject'), selection.join(', '));
        }
      }
    }),

    clearSearchDisabled: _ember['default'].computed.empty('searchFilter'),

    toggleSelection: function toggleSelection(value) {
      var selection = _ember['default'].A(this.get('selection'));
      if (_contains(selection, value)) {
        selection.removeObject(value);
      } else {
        selection.pushObject(value);
      }
      this.set('selection', selection);
    },

    selectAnItem: function selectAnItem(selected) {
      if (!this.get('disabled')) {
        if (this.get('multiple')) {
          this.set('keepDropdownOpen', true);
          this.toggleSelection(selected.get('item'));
        } else {
          this.setProperties({
            // TODO: value will be removed in the future
            value: selected.get('value'),
            selection: selected.get('item')
          });
        }
      }
    },

    sendChangeAction: function sendChangeAction() {
      var changeAction = _ember['default'].get(this, 'attrs.action');
      if (changeAction) {
        changeAction(this.get('selection'));
      }
    },

    actions: {
      selectItem: function selectItem(selected) {
        if (this.get('disabled')) {
          return true;
        }
        this.selectAnItem(selected);
        this.sendChangeAction();
        return false;
      },

      selectAllNone: function selectAllNone(listName) {
        if (this.get('disabled')) {
          return true;
        }
        this.get(listName).forEach(_ember['default'].run.bind(this, this.selectAnItem));
        this.sendChangeAction();
        return false;
      },

      selectByValue: function selectByValue() {
        if (this.get('disabled')) {
          return true;
        }
        var hasPrompt = _ember['default'].isPresent(this.get('prompt'));
        var contentList = this.get('contentList');
        var selectedValues = _ember['default'].makeArray(this.$('select').val());
        if (this.get('multiple')) {
          this.set('selection', contentList.filter(function (item) {
            return selectedValues.indexOf(item.get('value')) !== -1;
          }));
        } else if (hasPrompt && _ember['default'].isEmpty(selectedValues[0])) {
          this.setProperties({ value: null, selection: null });
        } else {
          this.send('selectItem', _findBy(contentList, 'value', selectedValues[0]));
        }
        this.sendChangeAction();
      },

      toggleSelectAllNone: function toggleSelectAllNone() {
        var listName;
        if (this.get('hasSelectedItems')) {
          listName = 'selectedContentList';
        } else {
          listName = 'unselectedContentList';
        }
        this.send('selectAllNone', listName);
        return false;
      },

      clearFilter: function clearFilter() {
        this.set('searchFilter', null);
        return false;
      }
    }
  });
});