<template>
  <QPage class="t-grid t-place-items-center">
    <p>{{ `${helloTitle || '...'}` }}</p>
    <p>{{ messages.hello }}</p>
  </QPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const messages = computed(() => ({
  hello: t('greetings.hello'),
}));

const helloTitle = ref<string | null>(null);

const getHello = async () => {
  const res = await fetch(import.meta.env.VITE_LOCAL_API_URL);
  helloTitle.value = await res.text();
};

getHello();
</script>
