'use strict';

Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
const node_crypto = require('node:crypto');
const node_process = require('node:process');
function sha256sum(data) {
  return node_crypto.createHash('sha256').update(data).digest('hex');
}
Object.defineProperty(exports, 'versions', {
  enumerable: true,
  get: () => node_process.versions,
});
exports.sha256sum = sha256sum;
const {contextBridge, ipcRenderer, Menu} = require('electron');

contextBridge.exposeInMainWorld('__electron_preload__sha256sum', exports.sha256sum);
contextBridge.exposeInMainWorld('__electron_preload__versions', exports.versions);

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ['application-export-to-markdown'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => fn(...args));
    }
  },
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  writeData: (path, data) => ipcRenderer.send('writeData', path, data),
  readData: path => ipcRenderer.send('readData', path),
  readLibData: () => ipcRenderer.invoke('readLibData'),
  getSequelizeInstance: () => ipcRenderer.invoke('getSequelizeInstance'),
  getBooks: () => ipcRenderer.invoke('getBooks'),
  addBook: (name, path) => ipcRenderer.send('addBook', name, path),
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY2pzIiwic291cmNlcyI6WyIuLi9zcmMvbm9kZUNyeXB0by50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3R5cGUgQmluYXJ5TGlrZSwgY3JlYXRlSGFzaH0gZnJvbSAnbm9kZTpjcnlwdG8nO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hhMjU2c3VtKGRhdGE6IEJpbmFyeUxpa2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShkYXRhKS5kaWdlc3QoJ2hleCcpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFTyxTQUFBLFVBQUEsTUFBQTtBQUNMLFNBQUEsWUFBQSxXQUFBLFFBQUEsRUFBQSxPQUFBLElBQUEsRUFBQSxPQUFBLEtBQUE7QUFDRjs7Ozs7Ozs7Ozs7In0=
// import {Titlebar} from 'custom-electron-titlebar';
window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
});
