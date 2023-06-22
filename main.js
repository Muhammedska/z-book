// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow,Notification, ipcMain } = require('electron')
const path = require('path')
const screenshot = require('electron-screenshot');
const { screen } = require('electron');

let isWindowMax = false;


function createNotfiy(title, description) {
    new Notification({title: title, body: description, icon:appSet['appIcon'] }).show()
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('pages/test.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('sscapture', (x,y,w,h) => {
    screenshot({
      filename: './screenshot.png', // Kaydedilecek dosya adı ve yolunu belirleyin
      x: x,
      y: y,
      width: w,
      height: h
    }, (error, complete) => {
      if (error) {
        console.error('Ekran görüntüsü alınamadı:', error);
      } else {
        console.log('Ekran görüntüsü başarıyla alındı:', complete);
      }
  
      // Uygulamayı kapatın.
      app.quit();
    });
  });

  ipcMain.on('close-window', () => {
    createNotfiy('Sound Near', 'Pencere kapatıldı')
    win.close()
  });

  ipcMain.on('maxim-window', () => {
    if (isWindowMax == false) {
      win.maximize()
      isWindowMax = true;
    } else {
      win.unmaximize()
      isWindowMax = false;
    }
  });

  ipcMain.on('minim-window', () => {
    win.minimize()
  });
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.