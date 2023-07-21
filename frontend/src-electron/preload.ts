import { contextBridge } from 'electron';
import { useServerPreload } from './uses/server-preload';
import { guard } from 'app/shared/tools/guard';

export const electronApi = {
  onServerReady: undefined as undefined | ReturnType<typeof useServerPreload>['onServerReady'],
  isServerReady: undefined as undefined | ReturnType<typeof useServerPreload>['isServerReady'],
};

guard({
  env: {
    NODE_ENV: 'production',
    UI_ENV: 'electron',
  },
}, () => {
  const { onServerReady, isServerReady } = useServerPreload();

  electronApi.onServerReady = onServerReady;
  electronApi.isServerReady = isServerReady;
});

contextBridge.exposeInMainWorld('electron', electronApi);
