const {app, BrowserWindow} = require('electron')

let indexWindow;

function createWindow () {

    indexWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  indexWindow.loadFile('index.html')

  // Open the DevTools.
//   indexWindow.webContents.openDevTools();

  indexWindow.on('closed', function () {
    indexWindow = null
  })

}

app.on('ready', createWindow);
