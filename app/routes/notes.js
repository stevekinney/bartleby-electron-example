import Ember from 'ember';

const electron = requireNode('electron');
const remote = electron.remote;
const mainProcess = remote.require('./electron.js');

export default Ember.Route.extend({
  model() {
    return this.store.findAll('note');
  },

  afterModel(model) {
    let notes = model.toArray().map(note => {
      return note.serialize({includeId: true})
    });

    mainProcess.updateMenu(notes);
  }
});
