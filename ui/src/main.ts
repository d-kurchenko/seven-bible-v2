import { createApp } from 'src/shared/wrappers/vue/app';
import App from 'src/app/App.vue';

import { vuePlugins } from 'src/app/plugins';

import 'src/app/styles/style.css';

const app = createApp(App);

app.registerPlugins(vuePlugins);

app.mount('#app');
