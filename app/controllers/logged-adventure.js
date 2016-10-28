import Ember from 'ember';


export default Ember.Controller.extend({
firstVisit: "10/18/25",
hoursSpent: "4000 hours",
timesVisited: "500 times",
othersVisited: "525000 others visited",

isEditing: false,

actions: {
    toggleEdit() {
      this.set('isEditing', !this.get('isEditing'));
    }
  }
});
