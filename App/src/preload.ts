const { contextBridge, ipcRenderer } = require('electron');

type API = {
  getClipboardText: () => Promise<any>;
};

contextBridge.exposeInMainWorld('API', {
  getClipboardText: async ():Promise<Electron.NativeImage> => {
    return await ipcRenderer.invoke('get-clipboard-image');
  }
});