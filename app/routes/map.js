import Ember from 'ember';

export default Ember.Route.extend({
menuOption: {"label": "Map", "value": "map"},

actions: {
    handleClick() {
    this.transitionTo('logged-adventure');
    },
    logAdventure() {
    this.transitionTo('log-new-adventure');
    }
  }
});
