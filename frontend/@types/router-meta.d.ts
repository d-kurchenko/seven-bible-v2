import 'vue-router';

export type Layout = 'main' | 'empty';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    layout?: Layout;
  }
}
