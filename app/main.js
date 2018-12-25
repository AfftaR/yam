'use strict';

const electron = require('electron');
const menuTemplate = require('./menu');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const globalShortcut = electron.globalShortcut;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const inCurrentDir = appends => 'file://' + __dirname + appends;

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1280, height: 800,
    icon: inCurrentDir('/icons/source_colored_png/256x256.png'),
    webPreferences: {nativeWindowOpen: true, affinity: 'main-window'}});
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.loadURL(inCurrentDir('/index.html'));

  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault()

    Object.assign(options, {
      modal: true, parent: mainWindow,
      width: 600, height: 800,
      webPreferences: {affinity: 'main-window'}
    })

    event.newGuest = new BrowserWindow(options)
    event.newGuest.on('closed', event => {
      setTimeout(() => {
        mainWindow.reload();
      }, 1000);
    })
  });

  mainWindow.on('close', event => {
    if (process.platform === 'darwin') {
      event.preventDefault();
      mainWindow.hide();
    } else {
      app.quit();
    }
  });

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow = null;
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('media-next-track');
  });

  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('media-prev-track');
  });

  globalShortcut.register('MediaStop', () => {
    mainWindow.webContents.send('media-stop');
  });

  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('media-play-pause');
  });
}

app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// For OSX, show hidden mainWindow when clicking dock icon.
app.on('activate', event => {
  mainWindow.show();
});
