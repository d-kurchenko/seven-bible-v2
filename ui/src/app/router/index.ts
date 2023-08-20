import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { routes } from './routes';
import { is } from 'app/shared/tools/is';
import { appConfig } from 'app/shared/config';

export const router = createRouter({
  history: (is.electron ? createWebHashHistory : createWebHistory)(
    appConfig.baseUrl,
  ),
  routes,
});
