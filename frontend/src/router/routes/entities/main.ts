import { defineRouteEntity } from 'app/src/wrappers/vue/router';

export const mainRouteEntity = defineRouteEntity({
  path: '/',
  name: 'main',
  component: () => import('src/pages/MainPage.vue'),
  meta: {
    title: 'Main',
  },
});
