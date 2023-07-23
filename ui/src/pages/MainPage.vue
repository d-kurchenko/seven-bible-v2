<template>
  <QPage class="t-grid t-place-items-center">
    <pre>gql {{ `${JSON.stringify(result, null, 2) || '...'}` }}</pre>
    <p>i18n {{ messages.hello }}</p>
  </QPage>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GetBibleDocument } from 'src/gql/generated/graphql';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const messages = computed(() => ({
  hello: t('greetings.hello'),
}));

const { result } = useQuery(GetBibleDocument);
</script>
