<script setup lang="ts">
import { ref, reactive, type Ref, type UnwrapNestedRefs } from 'vue'
import axios from 'axios'

const url: Ref<string> = ref('')
const ips: UnwrapNestedRefs<Set<string>> = reactive(new Set<string>())

async function resolutionStart(): Promise<void> {
  ips.clear()

  const domain: string = url.value.replace(/^(https?:|ftp:)(\/\/)/, '').split('/')[0]
  await resolve(`https://dns.alidns.com/resolve?name=${domain}`)
  await resolve(`https://ns.net.kg/dns-query?name=${domain}`)
  await resolve(`https://8.8.8.8/resolve?name=${domain}`)
}

async function resolve(url: string) {
  await axios
    .get(url)
    .then((response) => {
      for (const answer of response.data.Answer) ips.add(answer.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <v-card class="search-v-card">
    <v-text-field
      v-model="url"
      variant="solo"
      hide-details
      label="Gimme Ur URL"
      autofocus
      @keypress.enter="resolutionStart"
    />
    <v-btn class="search-v-btn" @click="resolutionStart">Resolve</v-btn>
  </v-card>
  <v-list class="text-body-2" lines="one">
    <v-list-item v-for="ip in ips" :key="ip" :value="ip">{{ ip }}</v-list-item>
  </v-list>
</template>

<style scoped>
.search-v-card {
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: hsl(160, 100%, 37%);
  color: white;
}

.search-v-btn {
  display: inline-block;
  height: 100%;
  margin-left: 1rem;
  border: 1px solid gainsboro;
  background-color: hsl(160, 100%, 37%);
}
</style>
