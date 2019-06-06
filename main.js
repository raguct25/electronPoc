const {app, BrowserWindow} = require('electron');

let indexWindow;

function createWindow () {

    indexWindow = new BrowserWindow({
    width: 600,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    show: false
  })

  indexWindow.loadFile('./Quote/quote.html');

  // Open the DevTools.
//   indexWindow.webContents.openDevTools();

  indexWindow.on('closed', function () {
    indexWindow = null
  })

  //this one used for white window dont show show main window it has declare show : false in new BrowserWindow({})
  indexWindow.once('ready-to-show', ()=>{
    indexWindow.show()
  })

}

app.on('ready', createWindow);
