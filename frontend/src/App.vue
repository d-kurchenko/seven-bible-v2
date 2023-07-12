<template>
  <div
    v-if="isLoading"
    class="fit flex items-center justify-center"
  >
    <QSpinnerGears
      color="primary"
      size="4em"
      class="flex justify-center items-center"
    />
  </div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { guard } from 'app/shared/tools/guard';

const [isLoading, toggleLoading] = useToggle(false);

guard({
  env: {
    MODE: 'electron',
    NODE_ENV: 'production',
  },
}, () => {
  const isServerStarted = Boolean(window.electron.isServerReady?.());
  toggleLoading(!isServerStarted);
  if (isLoading.value) {
    window.electron.onServerReady?.(() => toggleLoading(false));
  }
});

guard({
  env: {
    MODE: ['spa', 'electron'],
    NODE_ENV: 'development',
  },
}, () => {
  toggleLoading(true);
  const interval = setInterval(async () => {
    try {
      const res = await fetch(process.env.LOCAL_API_URL);
      if (res.ok) {
        clearInterval(interval);
        toggleLoading(false);
      }
    } catch (_) {}
  }, 100);
});
</script>
