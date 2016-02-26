/* jshint node: true */
'use strict';

const electron         = require('electron');
const FileBin          = require('file-bin');

const Menu = electron.Menu;
const Tray = electron.Tray;

const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;


let mainWindow = null;
let filesystem = new FileBin(__dirname + '/notes', ['.txt', '.md', '.markdown']);
let appIcon = null;

electron.crashReporter.start();

app.on('window-all-closed', function onWindowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  delete mainWindow.module;

  mainWindow.loadURL(emberAppLocation);
  appIcon = new Tray('./assets/icon.png');

  appIcon.setToolTip('This is my application.');

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

exports.filesystem = filesystem;

const updateMenu = exports.updateMenu = (notes) => {
  let noteMenuItems = notes.map(note => {
    return { label: note.id, click: function () {
      mainWindow.webContents.send('note-selected', note.id);
    } };
  });

  let contextMenu = Menu.buildFromTemplate(noteMenuItems);
  appIcon.setContextMenu(contextMenu);
};

