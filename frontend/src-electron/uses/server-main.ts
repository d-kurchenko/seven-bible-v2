import { ipcMain } from 'electron';
import { ElectronChanel } from '../electron-channel';
import dotenv from 'dotenv';
import path from 'path';
import { fork } from 'child_process';
import { createEventHook } from '@vueuse/core';

export const useServerMain = (serverDir: string) => {
  let isServerReady = false;

  const nestEnvs = dotenv.config({
    path: path.join(serverDir, '.env'),
  });

  const serverProcess = fork(path.join(serverDir, `dist/main.js`), {
    env: {
      ...process.env,
      ...nestEnvs.parsed,
    } as never,
  });

  const { on: onServerReady, trigger: triggerServerReady } = createEventHook<boolean>();
  serverProcess.once('message', (message) => {
    if (message === 'ready') {
      isServerReady = true;
      triggerServerReady(true);
    }
  });

  // For case when server-ready state was sended before renderer process has been started
  ipcMain.handle(ElectronChanel.SERVER_READY, () => isServerReady);

  return {
    serverProcess,
    onServerReady,
  };
};
