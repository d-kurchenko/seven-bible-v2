import { type electronApi as ElectronApi } from 'src-electron/preload';

declare global {
  interface Window {
    electron: typeof ElectronApi;
  }
}
