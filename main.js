const {app, BrowserWindow, ipcMain, dialog,  Menu, shell, MenuItem, globalShortcut} = require('electron');

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

  indexWindow.loadFile('./Menu/appMenu.html');

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

//normal declaration
// app.on('ready', createWindow);

//custom menu declaration
// imports { Menu, shell, MenuItem, globalShortcut}

app.on('ready', function(){
  createWindow();
  const template = [
    {
      label : 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        { type: 'separator' },
        {role: 'selectall'},
      ]
    },
    {label : 'codingtown',
     submenu : [
       {
         label: 'Raphael',
         click: function(){
           console.log('Raphael called')
         }
       },
       {
         type: 'separator'
       },
       {
         label: 'Edison'
       },
       {
         type: 'separator'
       },
       {
         label: 'CT website',
       },
     ]
    },
    {label : 'ErpRoots',
    submenu : [
      {
        label: 'Loganatahn'
      },
      {
        label: 'Kavin'
      }
    ]
  },
  {
    label : 'Help',
    submenu: [
      {
        label: 'CT wesite',
        click: function(){
          shell.openExternal('http://codingtown.com/');
        },
        accelerator: 'CmdorCtrl + Shift + C'
      }
    ]
}
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  const ctxMenu = new Menu();
  ctxMenu.append(new MenuItem({
    label: 'test1',
    click: function(){
      console.log('context menu clicked');
    }
  }));
  ctxMenu.append(new MenuItem({
    role: 'selectall',
  }));
  ctxMenu.append(new MenuItem({
    role: 'quit',
  }));

  indexWindow.webContents.on('context-menu', function(e, params){
    ctxMenu.popup(indexWindow, params.x, params.y);
  })

  globalShortcut.register('Alt+1', function(){
    indexWindow.show();
  });
})

app.on('will-quit', function(){
  globalShortcut.unregisterAll();
})
