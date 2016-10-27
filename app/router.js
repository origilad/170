import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('map');

  this.route('adventure-analytics');
  this.route('travel-log');
});

export default Router;