<template>
  <BaseGuard :is="IsKey.ELECTRON">
    Electron
  </BaseGuard>

  <BaseGuard :is="IsKey.SPA">
    SPA
  </BaseGuard>
</template>

<script setup lang="ts">
import { IsKey } from 'app/shared/types';
import BaseGuard from 'src/shared/base/Guard/BaseGuard.vue';
</script>
