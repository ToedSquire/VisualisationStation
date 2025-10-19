const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let visualiserWin, controlWin, helpWin;

app.whenReady().then(() => {
  visualiserWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });

  controlWin = new BrowserWindow({
    width: 400,
    height: 700,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });

  visualiserWin.loadFile('visualiser.html');
  controlWin.loadFile('control.html');

  ipcMain.on('control-message', (e, data) => {
    if (data.type === 'load-visualiser') {
      const filePath = path.join(__dirname, 'visualisers', data.file);
      try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const script = new vm.Script(code);
        const sandbox = { module: {}, require };
        script.runInNewContext(sandbox);
        const visualiserModule = sandbox.module.exports;

        visualiserWin.webContents.send('visualiser-message', {
          type: 'visstscript-load',
          name: visualiserModule.name || data.file,
          code: code
        });
      } catch (err) {
        console.error('Failed to load VisScript:', err);
      }
    } else {
      visualiserWin.webContents.send('visualiser-message', data);
    }
  });

  ipcMain.on('open-help', () => {
    if (!helpWin || helpWin.isDestroyed()) {
      helpWin = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
      });
      helpWin.loadFile('help.html');
    } else {
      helpWin.focus();
    }
  });
});
