import { createApp } from 'src/wrappers/vue/app';
import App from './App.vue';

import { vuePlugins } from 'src/plugins';

import './styles/style.css';

const app = createApp(App);

app.registerPlugins(vuePlugins);

app.mount('#app');
