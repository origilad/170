define("ember-170-spots/controllers/logged-adventure", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    firstVisit: "10/18/25",
    hoursSpent: "4000 hours",
    timesVisited: "500 times",
    othersVisited: "525000 others visited",

    isEditing: false,

    isNotEditing: _ember["default"].computed('isEditing', function () {
      return !this.get('isEditing');
    }),

    starRating: 0,

    actions: {
      logStars: function logStars(rating) {
        this.set('starRating', rating);
      },

      toggleEdit: function toggleEdit() {
        this.set('isEditing', !this.get('isEditing'));
      }
    }
  });
});