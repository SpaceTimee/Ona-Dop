<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-tabs align-tabs="center">
    <v-tab to="/">Home</v-tab>
    <v-tab to="/about">About</v-tab>
  </v-tabs>
  <v-card class="pages-card">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </v-card>
</template>

<style scoped>
.pages-card {
  padding: 1rem;
}
</style>
