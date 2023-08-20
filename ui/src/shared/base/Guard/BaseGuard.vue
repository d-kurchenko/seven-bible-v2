<template>
  <slot v-if="hasPermission" />
</template>

<script setup lang="ts">
import { guard, type GuardOptions } from 'app/shared/tools/guard';
import { ref } from 'vue';

const props = defineProps<GuardOptions>();

const hasPermission = ref(guard(props));
</script>
