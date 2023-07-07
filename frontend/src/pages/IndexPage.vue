<template>
  <QPage class="row items-center justify-evenly">
    {{ `@${helloTitle}!dds` || '...' }}
  </QPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const helloTitle = ref<string | null>(null);

const getHello = async () => {
  const res = await fetch(process.env.API_URL);
  helloTitle.value = await res.text();
};

getHello();
</script>
