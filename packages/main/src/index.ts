import {app, dialog, ipcMain} from 'electron';
import './security-restrictions';
import {createWindow, restoreOrCreateWindow} from '/@/mainWindow';
import {platform} from 'node:process';
import * as fs from 'fs';
import {normalize} from 'path';
import * as sq from 'sequelize-typescript';
import {DataType} from 'sequelize-typescript';

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
const seqDb = new sq.Sequelize({
  dialect: 'sqlite',

  storage: normalize(app.getAppPath() + '/docket.db'),
});

const Books = seqDb.define(
  'Books',
  {
    bookName: {
      type: DataType.TEXT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    path: {type: DataType.TEXT, allowNull: false, unique: true},
  },
  {
    timestamps: false,
    // freezeTableName: true,
  },
);

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

app.on('quit', () => {
  seqDb.close();
});
/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

ipcMain.on('application-export-to-markdown', (_event, _args) => {
  const filename = dialog.showSaveDialogSync({
    filters: [{name: 'Markdown', extensions: ['md']}],
    properties: ['createDirectory'],
  });

  console.log(filename);
});
async function handleFileOpen() {
  const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openDirectory']});
  if (!canceled) {
    return filePaths[0];
  }
}
function writeData(path: string, data: string) {
  // eslint-disable-next-line
  const folder = /^(.*[\\\/])/.exec(normalize(path));
  if (folder) {
    fs.mkdirSync(folder[0], {recursive: true});
    fs.writeFileSync(normalize(path), data);
    console.log(path);
  }
}
function readData(path: string) {
  return fs.readFileSync(path);
}
function readLibData() {
  console.log(normalize(app.getAppPath() + '/books.json'));
  fs.closeSync(fs.openSync(normalize(app.getAppPath() + '/books.json'), 'w+'));
  console.log(fs.readFileSync(normalize(app.getAppPath() + '/books.json'), 'utf8'));
  return fs.readFileSync(normalize(app.getAppPath() + '/books.json'), 'utf8');
}
function getSequelizeInstance() {
  return seqDb;
}

async function getBooks() {
  try {
    await seqDb.sync();
    const res = await Books.findAll();
    console.log(res.every(res => res instanceof Books));
    console.log(JSON.stringify(res, null, 2));
    return res;
  } catch (e) {
    return e;
  }
}
async function addBook(name: string, path: string) {
  try {
    await seqDb.sync();
    await Books.create({bookName: name, path: path});
    return 'success';
  } catch (e) {
    return e;
  }
  // try {
  //   const res = await Books.findAll();
  //   console.log(res.every(res => res instanceof Books));
  //   console.log(JSON.stringify(res, null, 2));
  //   return res;
  // } catch (e) {
  //   return e;
  // }
}
// ipcMain.on('open-file', (event, data) => {
//   dialog.showOpenDialog(data).then(filePaths => {
//     event.sender.send('open-file-paths', filePaths);
//   });
// });
// ipcMain.on('open-file-dialog', function (event) {
//   const option = 'openDirectory';
//   dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
//     properties: [option],
//   });
// });

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(async () => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('readLibData', readLibData);
    ipcMain.on('writeData', (_event, mPath: string, mdata: string) => {
      writeData(mPath, mdata);
    });
    ipcMain.on('readData', (_event, mPath: string) => {
      return readData(mPath);
    });

    try {
      await seqDb.authenticate();
      ipcMain.handle('getSequelizeInstance', getSequelizeInstance);
      ipcMain.handle('getBooks', getBooks);
      ipcMain.on('addBook', (_event, mName: string, mPath: string) => {
        addBook(mName, mPath);
      });
      // console.log('Connection has been established successfully.');
      // const Books = seqDb.define(
      //   'Books',
      //   {
      //     bookName: {
      //       type: DataType.TEXT,
      //       allowNull: false,
      //       unique: true,
      //       primaryKey: true,
      //     },
      //     path: {type: DataType.TEXT, allowNull: false, unique: true},
      //   },
      //   {
      //     timestamps: false,
      //     // freezeTableName: true,
      //   },
      // );
      // (async () => {
      //   await seqDb.sync({force: false});
      //   // Code here
      //   try {
      //     const test = await Books.create({bookName: 'Testjkhjkjhk', path: 'testasdasd'});
      //     await test.save();
      //   } catch (e) {
      //     console.log(e);
      //   }
      //   try {
      //     const select = await Books.findAll();
      //     console.log(select.every(select => select instanceof Books));
      //     console.log(JSON.stringify(select, null, 2));
      //   } catch (e) {
      //     console.log(e);
      //   }
      // })();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw new Error(JSON.stringify(error));
    }

    createWindow();
  })
  .catch(e => console.error('Failed create window:', e));

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(module => {
//       const {default: installExtension, VUEJS3_DEVTOOLS} =
//         // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
//         typeof module.default === 'function' ? module : (module.default as typeof module);
//
//       return installExtension(VUEJS3_DEVTOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(module => {
      const autoUpdater =
        module.autoUpdater ||
        // @ts-expect-error Hotfix for https://github.com/electron-userland/electron-builder/issues/7338
        (module.default.autoUpdater as (typeof module)['autoUpdater']);
      return autoUpdater.checkForUpdatesAndNotify();
    })
    .catch(e => console.error('Failed check and install updates:', e));
}

// // Modules to control application life and create native browser window
// const {app, BrowserWindow, Menu, nativeImage, ipcMain, nativeTheme} = require('electron');
// const {setupTitlebar, attachTitlebarToWindow} = require('custom-electron-titlebar/main');
// const path = require('path');

// // Setup the titlebar
// setupTitlebar();

// function createWindow() {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 1000,
//     height: 600,
//     frame: false, // Use to linux
//     titleBarStyle: 'hidden',
//     titleBarOverlay: true,
//     webPreferences: {
//       sandbox: false,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   /* const menu = Menu.buildFromTemplate(exampleMenuTemplate)
// 	Menu.setApplicationMenu(menu) */

//   // and load the index.html of the app.
//   // mainWindow.loadFile('index.html')
//   mainWindow.loadURL('https://github.com');

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()

//   // Attach listeners
//   attachTitlebarToWindow(mainWindow);
// }

// ipcMain.handle('dark-mode:toggle', () => {
//   if (nativeTheme.shouldUseDarkColors) {
//     nativeTheme.themeSource = 'light';
//   } else {
//     nativeTheme.themeSource = 'dark';
//   }
//   return nativeTheme.shouldUseDarkColors;
// });

// ipcMain.handle('dark-mode:system', () => {
//   nativeTheme.themeSource = 'system';
// });

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.

// // Custom menu
// const exampleMenuTemplate = [
//   {
//     label: 'Simple O&ptions',
//     submenu: [
//       {
//         label: 'Quit',
//         click: () => app.quit(),
//       },
//       {
//         label: 'Radio1',
//         type: 'radio',
//         checked: true,
//       },
//       {
//         label: 'Radio2',
//         type: 'radio',
//       },
//       {
//         label: 'Check&box1',
//         type: 'checkbox',
//         checked: true,
//         click: (item: any) => {
//           console.log('item is checked? ' + item.checked);
//         },
//       },
//       {type: 'separator'},
//       {
//         label: 'Che&ckbox2',
//         type: 'checkbox',
//         checked: false,
//         click: (item: any) => {
//           console.log('item is checked? ' + item.checked);
//         },
//       },
//     ],
//   },
//   {
//     label: 'With &Icons',
//     submenu: [
//       {
//         icon: nativeImage.createFromPath(path.resolve('example/assets', 'home.png')),
//         label: 'Go to &Home using Native Image',
//       },
//       {
//         icon: path.resolve('example/assets', 'run.png'),
//         label: 'Run using string',
//         submenu: [
//           {
//             label: 'Submenu of run',
//           },
//           {
//             label: 'Print',
//             accelerator: 'CmdOrCtrl+P',
//           },
//           {
//             type: 'separator',
//           },
//           {
//             label: 'Item 2 of submenu of run',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'A&dvanced Options',
//     submenu: [
//       {
//         label: 'Quit',
//         click: () => app.quit(),
//       },
//       {
//         label: 'Radio1',
//         type: 'radio',
//         checked: true,
//       },
//       {
//         label: 'Radio2',
//         type: 'radio',
//       },
//       {
//         label: 'Checkbox1',
//         type: 'checkbox',
//         checked: true,
//         click: (item: any) => {
//           console.log('item is checked? ' + item.checked);
//         },
//       },
//       {type: 'separator'},
//       {
//         label: 'Checkbox2',
//         type: 'checkbox',
//         checked: false,
//         click: (item: any) => {
//           console.log('item is checked? ' + item.checked);
//         },
//       },
//       {
//         label: 'Radio Test',
//         submenu: [
//           {
//             label: 'S&ample Checkbox',
//             type: 'checkbox',
//             checked: true,
//           },
//           {
//             label: 'Radio1',
//             checked: true,
//             type: 'radio',
//           },
//           {
//             label: 'Radio2',
//             type: 'radio',
//           },
//           {
//             label: 'Radio3',
//             type: 'radio',
//           },
//           {type: 'separator'},
//           {
//             label: 'Radio1',
//             checked: true,
//             type: 'radio',
//           },
//           {
//             label: 'Radio2',
//             type: 'radio',
//           },
//           {
//             label: 'Radio3',
//             type: 'radio',
//           },
//         ],
//       },
//       {
//         label: 'zoomIn',
//         role: 'zoomIn',
//       },
//       {
//         label: 'zoomOut',
//         role: 'zoomOut',
//       },
//       {
//         label: 'Radio1',
//         type: 'radio',
//       },
//       {
//         label: 'Radio2',
//         checked: true,
//         type: 'radio',
//       },
//     ],
//   },
//   {
//     label: '&View',
//     submenu: [
//       {role: 'reload'},
//       {role: 'forceReload'},
//       {type: 'separator'},
//       {role: 'zoomIn'},
//       {role: 'zoomOut'},
//       {role: 'resetZoom'},
//       {role: 'toggleDevTools', icon: path.resolve('example/assets', 'terminal.png')},
//     ],
//   },
// ];
