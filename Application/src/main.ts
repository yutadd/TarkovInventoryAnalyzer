import path from "node:path";
import { BrowserWindow, app, ipcMain, clipboard, nativeImage, Menu } from "electron";
// fsとpathをインポート
import fs from "fs";
import { TaskItemData } from "./web/App";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, "preload.js"),
    },
    icon: __dirname + '../../assets/win/icon.ico',
  });
  mainWindow.loadFile("dist/index.html");
  const menuTemplate:Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        { label: '終了', click: () => { app.quit(); } }
      ],
    },
    {
      label:"Language",
      submenu:[
        {
          label:"日本語",
          click:()=>{
            mainWindow.webContents.send("menu-click","lang-ja");
          }
        },
        {
          label:"English",
          click:()=>{
            mainWindow.webContents.send("menu-click","lang-en")
          }
        }
      ]
    },
    {
      label:"History",
      click: () => {
        mainWindow.webContents.send('menu-click','history');
      },
    }
  ];
  mainWindow.webContents.openDevTools({ mode: "detach" });
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
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


ipcMain.handle('getTaskItemFromFile', (e, fileName: string, itemName: string): TaskItemData[] => {
  const fileContent = fs.readFileSync(fileName)
  const parsedItems = JSON.parse(fileContent.toString())
  //console.log(parsedItems)
  let result = []
  for (let task of parsedItems['data']['tasks']) {
    for (let objective of task['objectives']) {
      if ('items' in objective) {
        for (let item of objective['items']) {
          //console.log(item)
          //@ts-ignore
          if (item['name'] === itemName) {
            result.push({
              taskId: task['id'],
              taskName: task['name'],
              item: itemName,
              count: objective['count'] ? objective['count'] : 1
            })
          }
        }
      } else {
        //console.log('items not in objective')
      }
    }
  }
  return result
});
ipcMain.handle('get-hideout-items', (e, itemName: string): JSON => {
  const data = fs.readFileSync('hideoutItems.json')
  const hideoutData = JSON.parse(data.toString());
  const hideoutInfoList: any = [];
  console.log(hideoutData.data)
  hideoutData.data.hideoutStations.forEach((station: { levels: any[]; name: any; }) => {
    if (station.levels) {
      station.levels.forEach((level: { itemRequirements: any[]; level: any; }) => {
        if (level.itemRequirements) {
          level.itemRequirements.forEach((requirement: { item: { name: any; }; count: any; }) => {
            if (requirement) {
              if (requirement.item.name === itemName) {
                hideoutInfoList.push({
                  station: station.name,
                  level: level.level,
                  item: itemName,
                  count: requirement.count
                });
              }
            }
          });
        }
      });
    }
  });
  return hideoutInfoList;
});