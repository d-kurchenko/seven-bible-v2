import { defineRouteEntity } from 'src/shared/helpers/router';

export const mainRouteEntity = defineRouteEntity({
  path: '/',
  name: 'main',
  component: () => import('src/pages/MainPage.vue'),
  meta: {
    title: 'Main',
  },
});
