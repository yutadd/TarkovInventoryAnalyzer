const { contextBridge, ipcRenderer } = require('electron');

type API = {
  getClipboardText: () => Promise<any>;
  getLocalText: (filepass: string) => Promise<string>;
  getTemplateImages: () => { name: string, content: string }[];
};

contextBridge.exposeInMainWorld('API', {
  getClipboardText: async (): Promise<Electron.NativeImage> => {
    return await ipcRenderer.invoke('get-clipboard-image');
  }, getLocalText: async (filepass: string): Promise<string> => {
    return await ipcRenderer.invoke('get-local-image', filepass);
  }, getTemplateImages: async (): Promise<{ name: string, content: string }[]> => {
    return await ipcRenderer.invoke('get-template-images');
  }
});