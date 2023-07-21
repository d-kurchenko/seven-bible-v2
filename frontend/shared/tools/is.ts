export const is = {
  electron: import.meta.env.UI_ENV === 'electron',
  spa: import.meta.env.UI_ENV === 'spa',
  prod: import.meta.env.NODE_ENV === 'production',
  dev: import.meta.env.NODE_ENV === 'development',
};
