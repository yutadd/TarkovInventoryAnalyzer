import path from "node:path";
import { BrowserWindow, app,ipcMain,clipboard } from "electron";

app.whenReady().then(() => {
    // アプリの起動イベント発火で BrowserWindow インスタンスを作成
    const mainWindow = new BrowserWindow({
        webPreferences: {
            // webpack が出力したプリロードスクリプトを読み込み
            sandbox:true,
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    // レンダラープロセスをロード
    
    mainWindow.loadFile("dist/index.html");
    mainWindow.webContents.openDevTools();
});

ipcMain.handle('get-clipboard-image', ():Electron.NativeImage=> {
    return clipboard.readImage();
  });
// すべてのウィンドウが閉じられたらアプリを終了する
app.once("window-all-closed", () => app.quit());