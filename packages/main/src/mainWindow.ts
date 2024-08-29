import * as electron from 'electron';
import {app, BrowserWindow, ipcMain} from 'electron';
import {join} from 'node:path';
import {URL} from 'node:url';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 328,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,

      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), 'packages/preload/src/preload.js'),
    },
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });
  browserWindow.webContents.setWindowOpenHandler(({url}) => {
    electron.shell.openExternal(url);
    return {action: 'deny'};
  });
  browserWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    const {requestHeaders} = details;
    UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
    callback({requestHeaders});
  });

  browserWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const {responseHeaders} = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test.
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

function UpsertKeyValue(
  obj: Record<string, string[]> | Record<string, string> | undefined,
  keyToChange: string,
  value: string[],
) {
  const keyToChangeLower = keyToChange.toLowerCase();
  if (obj) {
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === keyToChangeLower) {
        // Reassign old key
        obj[key] = value;
        // Done
        return;
      }
    }
    // Insert at end instead
    obj[keyToChange] = value;
  }
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
