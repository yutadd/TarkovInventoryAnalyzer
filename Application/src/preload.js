// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('API', {
  getClipboardText:async () => {
    return await ipcRenderer.invoke('get-clipboard-text');
  }
  // 関数だけでなく変数も公開できます
})