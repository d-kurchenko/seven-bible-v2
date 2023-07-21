import { createEventHook } from '@vueuse/core';
import { type IpcRendererEvent, ipcRenderer } from 'electron';
import { ElectronChanel } from '../channel';

export const useServerPreload = () => {
  let isServerReady = false;
  const { on: onServerReady, trigger: triggerServerReady } = createEventHook<boolean>();

  const serverReadyHandler = (_: IpcRendererEvent, ready: boolean) => {
    if (ready) {
      isServerReady = true;
      triggerServerReady(true);
    }
  };
  ipcRenderer.on(ElectronChanel.SERVER_READY, serverReadyHandler);

  // Check is server ready for case if renderer process has been started afer server
  ipcRenderer.invoke(ElectronChanel.SERVER_READY)
    .then((ready) => {
      if (ready) {
        isServerReady = true;
        ipcRenderer.removeListener(ElectronChanel.SERVER_READY, serverReadyHandler);
        triggerServerReady(true);
      }
    });

  return {
    onServerReady,
    isServerReady: () => isServerReady,
  };
};
