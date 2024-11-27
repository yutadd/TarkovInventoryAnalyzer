import path from "node:path";
import { BrowserWindow, app, ipcMain, clipboard, nativeImage } from "electron";
// fsとpathをインポート
import fs from "fs";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
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
/**
 * TODO:読み込みたい画像パスを引数にして呼び出すと、画像を読み込んで、Electron.NativeImageで画像を返す関数を作る
 */
ipcMain.handle('get-local-image', (e, filepass): string => {
  return nativeImage.createFromPath(filepass).toDataURL()
});
ipcMain.handle('get-template-images', (e,): { name: string, content: string }[] => {
  function exploreDirectory(directory: string): { name: string, content: string }[] {
    let encodedFileData: { name: string, content: string }[] = [];
    const files: string[] = fs.readdirSync(directory);
    files.forEach(fileOrFolder => {
      const filePath = path.join(directory, fileOrFolder);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        const fileContent = fs.readFileSync(filePath);
        const encodedContent = fileContent.toString('base64');
        const fileNameWithoutExt = path.basename(fileOrFolder, path.extname(fileOrFolder));
        const decodedName = Buffer.from(fileNameWithoutExt, 'base64').toString('utf-8');
        encodedFileData.push({ name: decodedName, content: encodedContent });
      } else if (stats.isDirectory()) {
        encodedFileData = encodedFileData.concat(exploreDirectory(filePath));
      }
    });
    return encodedFileData;
  }
  const encodedFileData = exploreDirectory('itemImages/');
  return encodedFileData;
});