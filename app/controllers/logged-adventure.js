import Ember from 'ember';


export default Ember.Controller.extend({
firstVisit: "10/18/25",
hoursSpent: "4000 hours",
timesVisited: "500 times",
othersVisited: "525000 others visited",

isEditing: false,

isNotEditing: Ember.computed('isEditing', function(){
  return !this.get('isEditing');
}),

starRating: 0,

actions: {
    logStars(rating) {
      this.set('starRating', rating);
    },

    toggleEdit() {
      this.set('isEditing', !this.get('isEditing'));
    }
  }
});
