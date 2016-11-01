define('ember-stars/components/star-rating', ['exports', 'ember-component', 'ember-metal/get', 'ember-metal/set', 'ember-stars/templates/components/star-rating'], function (exports, _emberComponent, _emberMetalGet, _emberMetalSet, _emberStarsTemplatesComponentsStarRating) {
  'use strict';

  var RatingComponent = _emberComponent['default'].extend({
    layout: _emberStarsTemplatesComponentsStarRating['default'],

    fillColor: 'yellow',
    baseColor: 'lightgrey',
    numStars: 5,
    rating: 0,
    readOnly: false,
    width: 26,
    height: 26,
    svgPath: 'M25.326,10.137c-0.117-0.361-0.431-0.625-0.807-0.68l-7.34-1.066l-3.283-6.651 c-0.337-0.683-1.456-0.683-1.793,0L8.82,8.391L1.48,9.457c-0.376,0.055-0.689,0.318-0.807,0.68c-0.117,0.363-0.02,0.76,0.253,1.025 l5.312,5.178l-1.254,7.31c-0.064,0.375,0.09,0.755,0.397,0.978c0.309,0.225,0.717,0.254,1.054,0.076L13,21.252l6.564,3.451 c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.223,0.462-0.603,0.397-0.978l-1.254-7.31 l5.312-5.178C25.346,10.896,25.443,10.5,25.326,10.137z',
    viewBox: '0 0 26 26',

    isTouching: false,

    init: function init() {
      this._super.apply(this, arguments);
      var num = (0, _emberMetalGet['default'])(this, 'numStars');
      var stars = Array.apply(null, { length: num }).map(function () {
        return 1;
      });
      (0, _emberMetalSet['default'])(this, 'stars', stars);
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.$().css('display', 'inline-block');
      if (!(0, _emberMetalGet['default'])(this, 'readOnly')) {
        this.$().css('cursor', 'pointer');
      }
      var rating = (0, _emberMetalGet['default'])(this, 'rating');
      this._updateStars(rating);
    },

    mouseMove: function mouseMove(event) {
      this._render(event);
    },

    mouseLeave: function mouseLeave() {
      this._reset();
    },

    touchMove: function touchMove(event) {
      (0, _emberMetalSet['default'])(this, 'isTouching', true);
      this._render(event);
    },

    touchEnd: function touchEnd(event) {
      if (!(0, _emberMetalGet['default'])(this, 'isTouching')) {
        return;
      }
      (0, _emberMetalSet['default'])(this, 'isTouching', false);
      this._update(event);
    },

    click: function click(event) {
      this._update(event);
    },

    _render: function _render(event) {
      if ((0, _emberMetalGet['default'])(this, 'readOnly')) {
        return;
      }

      var pageX = event.pageX;
      if (event.touches !== undefined) {
        var touch = event.touches[0];
        pageX = touch.pageX;
      }

      var target = this._getTarget(pageX);
      var rating = Math.floor(target * 2) / 2;
      this._updateStars(rating);
    },

    _reset: function _reset() {
      if ((0, _emberMetalGet['default'])(this, 'readOnly')) {
        return;
      }
      var rating = (0, _emberMetalGet['default'])(this, 'rating');
      this._updateStars(Math.floor(rating * 2) / 2);
    },

    _update: function _update(event) {
      if ((0, _emberMetalGet['default'])(this, 'readOnly')) {
        return;
      }

      var pageX = event.pageX;
      if (event.changedTouches !== undefined) {
        var touch = event.changedTouches[0];
        pageX = touch.pageX;
      }

      var target = this._getTarget(pageX);
      var rating = Math.floor(target * 2) / 2;
      (0, _emberMetalGet['default'])(this, 'onClick')(rating);
    },

    _getTarget: function _getTarget(x) {
      var numStars = (0, _emberMetalGet['default'])(this, 'numStars');
      return numStars * (x - this.$().offset().left) / this.$().width() + 0.5;
    },

    _getStarOffset: function _getStarOffset(rating, index) {
      var result = rating - index;
      if (result > -0.01) {
        return '100%';
      } else if (result > -0.51) {
        return '50%';
      } else {
        return '0%';
      }
    },

    _updateStars: function _updateStars(rating) {
      var _this = this;

      this.$().find('> svg').each(function (index, elem) {
        var offset = _this._getStarOffset(rating, index + 1);
        _this.$(elem).find('stop').eq(0).attr('offset', offset);
        var klass = offset === '100%' ? 'star-full' : offset === '50%' ? 'star-half' : 'star-empty';
        _this.$(elem).removeClass().addClass(klass);
      });
    }
  });

  RatingComponent.reopenClass({
    positionalParams: ['rating']
  });

  exports['default'] = RatingComponent;
});