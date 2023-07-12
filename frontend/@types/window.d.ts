import { electronApi } from 'src-electron/electron-preload';

declare global {
  interface Window {
    electron: typeof electronApi;
  }
}
