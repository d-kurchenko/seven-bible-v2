import type { RouteRecordRaw } from 'vue-router';

type RouteEntity = RouteRecordRaw | RouteRecordRaw[]

export const defineRouteEntity = (routeRecordRaw: RouteEntity) => routeRecordRaw;

export const defineRouteEntities = (routes: [RouteEntity]) => {
  return Object.values(routes).reduce<RouteRecordRaw[]>(
    (acc, item) => {
      if (Array.isArray(item)) {
        return [...acc, ...item];
      } else {
        return [...acc, item];
      }
    },
    [],
  );
};
