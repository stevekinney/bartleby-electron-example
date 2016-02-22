import Ember from 'ember';

export default Ember.Controller.extend({

  newNote: this.store.createRecord('note'),

  actions: {
    createNote() {
      console.log(this.get('newNote.id'));
      this.set('newNote', this.store.createRecord('note'));
    }
  }

});
