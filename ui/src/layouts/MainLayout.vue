<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader elevated>
      <QToolbar>
        <QBtn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="() => toggleLeftDrawerOpen()"
        />

        <QToolbarTitle>
          Quasar App
        </QToolbarTitle>

        <div>Quasar v{{ $q.version }}</div>
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <QList>
        <QItemLabel
          header
        >
          Essential Links
        </QItemLabel>

        Drawer!
      </QList>
    </QDrawer>

    <QPageContainer>
      <RouterView ref="routerViewEl" />
    </QPageContainer>
  </QLayout>
</template>

<script setup="false" lang="ts">
import { useQuasar } from 'quasar';
import { useToggle } from '@vueuse/core';
import { ref } from 'vue';

const [leftDrawerOpen, toggleLeftDrawerOpen] = useToggle(false);
const $q = useQuasar();

const routerViewEl = ref<HTMLDivElement | null>(null);

</script>
