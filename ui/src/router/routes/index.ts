import { defineRouteEntities } from 'app/src/wrappers/vue/router';

import { mainRouteEntity } from './entities/main';

export const routes =  defineRouteEntities([
  mainRouteEntity,
]);
