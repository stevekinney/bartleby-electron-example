import Ember from 'ember';

const electron = require('electron');
const ipc = electron.ipcRenderer;
const mainProcess = electron.remote.require('./electron.js');

export default Ember.Controller.extend({

  _setup: function () {
    ipc.on('note-selected', (event, noteId) => {
      this.transitionToRoute('notes.note', noteId);
    });
  }.on('init'),

  _updateMenu: Ember.observer('model.[]', function () {
    console.log('wowowow');
    let notes = this.get('model').toArray().map(note => {
      return note.serialize({includeId: true});
    });

    mainProcess.updateMenu(notes);
  }),

  newNoteTitle: null,

  actions: {
    createNote() {
      this.store.createRecord('note', {
        id: this.get('newNoteTitle') + '.md'
      }).save().then(data => {
        this.transitionToRoute('notes.note', data);
      }).then(() => {
        this.set('newNoteTitle', null);
      });
    }
  }

});
