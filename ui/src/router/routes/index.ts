import { defineRouteEntities } from 'src/wrappers/vue/router';

import { mainRouteEntity } from './entries/main';

export const routes =  defineRouteEntities([
  mainRouteEntity,
]);
