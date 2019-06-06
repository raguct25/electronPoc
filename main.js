const {app, BrowserWindow, ipcMain, dialog} = require('electron');

let indexWindow;

function createWindow () {

    indexWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    // frame: false, it's shows don't have menu bar
    show: false
  })

  indexWindow.loadFile('./Ipc/ipcElectron.html');

  // Open the DevTools.
//   indexWindow.webContents.openDevTools();

  indexWindow.on('closed', function () {
    indexWindow = null
  })

  //this one used for white window dont show show main window it has declare show : false in new BrowserWindow({})
  indexWindow.once('ready-to-show', ()=>{
    indexWindow.show()
  })

  //ipc declaration
  // imports {ipcMain, dialog}

  ipcMain.on('open-error-dialog', function(event){
    dialog.showErrorBox('Error message', 'Error message content here');
    event.sender.send('opened-error-box', 'main js file send messgae');
  })

  ipcMain.on('async-message', function(event){
    event.sender.send('async-reply', 'Async main js file send messgae');
  })

  ipcMain.on('sync-message', function(event){
    event.returnValue = 'syncing text is return';
  })

}

app.on('ready', createWindow);
