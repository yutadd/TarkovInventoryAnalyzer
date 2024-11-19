import path from "node:path";
import { BrowserWindow, app, ipcMain, clipboard, nativeImage } from "electron";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar:true,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, "preload.js"),
    },
    icon: __dirname + '../../assets/win/icon.ico',
  });
  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: "detach" });
});


ipcMain.handle('get-clipboard-image', (): Electron.NativeImage => {
  return clipboard.readImage();
});
app.once("window-all-closed", () => app.quit());
