import Ember from 'ember';

export default Ember.Component.extend({

routes: Ember.A(["map", "adventure-analytics", "travel-log"]),

singleContent: Ember.A([{"label": "Map", "value": "map"}, {"label": "Adventure Analytics", "value": "adventure-analytics"}, {"label": "Travel Log", "value": "travel-log"}]),

actions: {
    setSingleChoice() {
      console.log(this.get('singleChoice').value);
      this.get('router').transitionTo(this.get('singleChoice').value);
    }
  }
});
