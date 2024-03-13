<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <v-tabs align-tabs="center">
    <v-tab to="/">Home</v-tab>
    <v-tab to="/about">About</v-tab>
  </v-tabs>
  <v-card>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </v-card>
  <SpeedInsights />
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
