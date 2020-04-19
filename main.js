  
const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const {app, BrowserWindow, Menu, globalShortcut, shell, webContents} = require('electron');

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({hasShadow: false, frame: true, minWidth: 200 ,minHeight: 45, webPreferences: {nodeIntegration:true}});
    mainWindow.setPosition(1720,0);
    mainWindow.setSize(1000,800);
    mainWindow.webContents.openDevTools();
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protcol:'file',
        slashes: true
    }));
});