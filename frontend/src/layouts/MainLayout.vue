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
          @click="toggleLeftDrawer"
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
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>

<script setup="false" lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>
