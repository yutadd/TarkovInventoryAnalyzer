import path from "node:path";
import { BrowserWindow, app,ipcMain,clipboard } from "electron";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      sandbox:true,
            contextIsolation:true,
            nodeIntegration:false,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: "detach" });
});
ipcMain.handle('get-clipboard-image', ():Electron.NativeImage=> {
  return clipboard.readImage();
});
app.once("window-all-closed", () => app.quit());
