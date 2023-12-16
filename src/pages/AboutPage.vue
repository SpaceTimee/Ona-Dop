<template>
  <v-card class="header-v-card text-h5">Ona Dop</v-card>
  <v-list class="text-body-2" lines="one">
    <v-list-item value="Developer">
      <p>Developer: Space Time</p>
    </v-list-item>
    <v-list-item value="Blog">
      <p>
        Blog:
        <a href="https://blog.spacetimee.xyz" rel="external noopener noreferrer"
          >https://blog.spacetimee.xyz</a
        >
      </p>
    </v-list-item>
    <v-list-item value="Version">
      <p>Version: 0.0.2 (Demo)</p>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.header-v-card {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: hsl(160, 100%, 37%);
  text-align: center;
  color: white;
}
</style>
