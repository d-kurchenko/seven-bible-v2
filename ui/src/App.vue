<template>
  <div
    v-if="isLoading"
    class="t-fit t-grid t-place-items-center"
  >
    <QSpinnerGears
      color="primary"
      size="4em"
      class="t-flex justify-center items-center"
    />
  </div>

  <Component
    :is="layout"
    v-else
  />
</template>

<script setup lang="ts">
import MainLayout from 'src/layouts/MainLayout.vue';
import EmptyLayout from 'src/layouts/EmptyLayout.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Layout } from 'app/@types/router-meta';
import { useToggle } from '@vueuse/core';
import { guard } from 'app/shared/tools/guard';
import { is } from 'app/shared/tools/is';

const [isLoading, toggleLoading] = useToggle(is.electron && is.prod);

guard({
  env: {
    UI_ENV: 'electron',
    NODE_ENV: 'production',
  },
}, () => {
  ('quard ui');
  const isServerStarted = Boolean(window.electron.isServerReady?.());
  toggleLoading(!isServerStarted);
  if (isLoading.value) {
    window.electron.onServerReady?.(() => toggleLoading(false));
  }
});

const route = useRoute();

const layoutsMap: Record<Layout, unknown> = {
  empty: EmptyLayout,
  main: MainLayout,
};

const layout = computed(() => layoutsMap[route.meta.layout || 'main']);
</script>
