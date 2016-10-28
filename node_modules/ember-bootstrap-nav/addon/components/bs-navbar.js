import Ember from 'ember';


/**
 Implements Bootstrap navbar, see http://getbootstrap.com/components/#navbar

 This implements the dropdown functionality on mobile for the navbar

 ```hbs
 {{#bs-navbar}}
  <!-- A workaround to get the "active" class
    to apply to the active <li> automatically -->
  {{#link-to 'navbar' tagName='li'}}
    {{link-to 'Navbar' 'navbar'}}
  {{/link-to}}
  {{#link-to 'tabs' tagName='li'}}
    {{link-to 'Tabs' 'tabs'}}
  {{/link-to}}
 {{/bs-navbar}}
 ```

 @class Navbar
 @namespace Components
 @extends Ember.Component
 */

export default Ember.Component.extend({
    tagName: 'nav',
    homeRoute: 'index',
    logoImg: '',
    name: '',

    classNameBindings: ['navbar'],

    actions: {
        toggleNav: function() {
          this.$('.navbar-collapse').slideToggle();
        }
    }
});
