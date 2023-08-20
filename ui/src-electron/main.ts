import {
  app, BrowserWindow, nativeTheme, shell,
} from 'electron';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { useServerMain } from './uses/server-main';
import { ElectronChanel } from './channel';
import { guard } from 'app/shared/tools/guard';
import type { ChildProcess } from 'child_process';
import { IsKey } from 'app/shared/types';

// Needed in case process is undefined under Linux
const platform = process.platform || os.platform();

// Disable electron security warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions'),
    );
  }
} catch (_) { () => undefined; }

let mainWindow: BrowserWindow | undefined;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'),
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  mainWindow.setMenuBarVisibility(false),
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);

    return {
      action: 'deny',
    };
  });

  if (!app.isPackaged) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
};

let serverProcess: undefined | ChildProcess;
guard({
  is: [IsKey.PRODUCTION, IsKey.ELECTRON],
}, () => {
  const serverDir = path.join(process.resourcesPath, 'server');
  const { serverProcess: _serverProcess, onServerReady } = useServerMain(serverDir);
  serverProcess = _serverProcess;
  onServerReady(() => mainWindow?.webContents.send(ElectronChanel.SERVER_READY, true));
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
    serverProcess?.kill('SIGINT');
  }
});
