const { contextBridge, ipcRenderer } = require('electron');

type API = {
  getClipboardText: () => Promise<any>;
  getLocalText: (filepass:string) => Promise<string>;
};

contextBridge.exposeInMainWorld('API', {
  getClipboardText: async ():Promise<Electron.NativeImage> => {
    return await ipcRenderer.invoke('get-clipboard-image');
  },  getLocalText: async (filepass:string):Promise<string> => {
    return await ipcRenderer.invoke('get-local-image',filepass);
  }
});