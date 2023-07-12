import {
  app, BrowserWindow, nativeTheme,
} from 'electron';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { useServerMain } from './uses/server-main';
import { ElectronChanel } from './electron-channel';
import { guard } from 'app/shared/tools/guard';
import { ChildProcess } from 'child_process';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions'),
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

const createWindow = () => {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    // autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      devTools: process.env.NODE_ENV !== 'production',
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
};

let serverProcess: undefined | ChildProcess;
guard({
  env: {
    NODE_ENV: 'production',
    MODE: 'electron',
  },
}, () => {
  const serverDir = path.join(process.resourcesPath, 'server');
  const { serverProcess: sp, onServerReady } = useServerMain(serverDir);
  serverProcess = sp;
  onServerReady(() => mainWindow?.webContents.send(ElectronChanel.SERVER_READY, true));
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
  serverProcess?.kill('SIGINT');
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
