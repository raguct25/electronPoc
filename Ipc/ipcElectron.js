const electron = require('electron');
const ipc = electron.ipcRenderer;
// const { BrowserWindow } = require('electron').remote;

const errorBtn = document.getElementById('errorButton');

errorBtn.addEventListener('click', function(){
  ipc.send('open-error-dialog');
})

ipc.on('opened-error-box', function(event, arg){
  console.log('event : ', event);
  console.log('arg is :  ', arg);
})

const asyncBtn = document.getElementById('asyncButton');

asyncBtn.addEventListener('click', function(){
  console.log('Async message 1');
  ipc.send('async-message');
  console.log('Asyn message 2');
})

ipc.on('async-reply', function(event, arg){
  console.log('arg is :  ', arg);
})

const syncBtn = document.getElementById('syncButton');

syncBtn.addEventListener('click', function(){
  console.log('Sync message 1');
  // ipc.send('sync-message');
  const syncMsg = ipc.sendSync('sync-message');
  console.log('syncMsg', syncMsg);
  console.log('Sync message 2');
})

ipc.on('sync-reply', function(event, arg){
  console.log('arg is :  ', arg);
})

// let win2 = new BrowserWindow();
// win2.loadURL('http://codingtown.com/')
