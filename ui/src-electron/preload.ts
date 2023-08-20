import { contextBridge } from 'electron';
import { useServerPreload } from './uses/server-preload';
import { guard } from 'app/shared/tools/guard';
import { IsKey } from 'app/shared/types';

export const electronApi = {
  onServerReady: undefined as undefined | ReturnType<typeof useServerPreload>['onServerReady'],
  isServerReady: undefined as undefined | ReturnType<typeof useServerPreload>['isServerReady'],
};

guard({
  is: [IsKey.PRODUCTION, IsKey.ELECTRON],
}, () => {
  const { onServerReady, isServerReady } = useServerPreload();

  electronApi.onServerReady = onServerReady;
  electronApi.isServerReady = isServerReady;
});

contextBridge.exposeInMainWorld('electron', electronApi);
