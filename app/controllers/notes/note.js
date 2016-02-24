import Ember from 'ember';

export default Ember.Controller.extend({

  superLoud: Ember.computed('model.content', function () {
    return this.get('model.content').toUpperCase();
  }),

  actions: {
    saveNote() {
      this.get('model').save();
    }
  }

});
