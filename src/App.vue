<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-tabs align-tabs="center">
    <v-tab to="/">Home</v-tab>
    <v-tab to="/about">About</v-tab>
  </v-tabs>
  <v-card>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </v-card>
</template>

<style scoped lang="less">
.v-tabs {
  min-height: 2.5rem;
  color: @primary-color;

  .v-tab {
    min-height: 2.5rem;
  }
}
</style>
