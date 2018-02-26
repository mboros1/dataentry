/* from the electron quick-start */
var electron = require('electron');
var XLSX = require('xlsx');
var app = electron.app;

var win = null;

let mainWindow;

function createWindow() {
	if(mainWindow) return;
	mainWindow = new electron.BrowserWindow({width:800, height:600});
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() { win = null; });
}
if(app.setAboutPanelOptions) app.setAboutPanelOptions({ applicationName: 'sheetjs-electron', applicationVersion: "XLSX " + XLSX.version, copyright: "(C) 2017-present SheetJS LLC" });
app.on('open-file', function() { console.log(arguments); });
app.on('ready', createWindow);
app.on('activate', createWindow);
app.on('window-all-closed', function() { if(process.platform !== 'darwin') app.quit(); });

// Create menu template
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label:'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
          'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If mac, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' :
          'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}
