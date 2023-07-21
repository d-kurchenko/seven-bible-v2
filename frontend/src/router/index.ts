import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { routes } from './routes';
import { is } from 'app/shared/tools/is';

export const router = createRouter({
  history: (is.electron ? createWebHashHistory : createWebHistory)(
    import.meta.env.BASE_URL,
  ),
  routes,
});
