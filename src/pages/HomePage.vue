<script setup lang="ts">
import { ref, reactive, type Ref, type UnwrapNestedRefs } from 'vue'
import axios from 'axios'

const url: Ref<string> = ref('')
const ips: UnwrapNestedRefs<Set<string>> = reactive(new Set<string>())

async function resolutionStart(): Promise<void> {
  ips.clear()

  const domain: string = url.value.replace(/^(https?:|ftp:)(\/\/)/, '').split('/')[0]
  if (domain && domain.toLowerCase() !== 'user ip') {
    await resolve(`https://dns.alidns.com/resolve?name=${domain}`)
    await resolve(`https://ns.net.kg/dns-query?name=${domain}`)
    await resolve(`https://8.8.8.8/resolve?name=${domain}`)
  } else {
    url.value = 'User IP'
    await resolve('https://jsonip.com', false)
  }
}

async function resolve(url: string, isDomainIp: boolean = true): Promise<void> {
  await axios
    .get(url)
    .then((response) => {
      if (isDomainIp) for (const answer of response.data.Answer) ips.add(answer.data)
      else ips.add(response.data.ip)
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
  <v-list class="text-body-2" lines="one" density="compact">
    <v-list-item v-for="ip in ips" :key="ip" :value="ip" :href="`http://${ip}`">{{
      ip
    }}</v-list-item>
  </v-list>
</template>

<style scoped lang="less">
.search-v-card {
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1rem;
  background-color: @primary-color;
  color: white;

  .search-v-btn {
    display: inline-block;
    height: 100%;
    margin-left: 1rem;
    border: 0.1rem solid white;
    background-color: @primary-color;
  }
}
</style>
