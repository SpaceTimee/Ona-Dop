<script setup lang="ts">
import { ref, reactive, type Ref, type UnwrapNestedRefs } from 'vue'
import axios from 'axios'

type SourceType = 'Ali' | 'Arashi' | 'Google'
type ColorType = 'red' | 'blue' | 'green'

class IpInfo {
  readonly ip: string
  readonly source?: SourceType
  readonly color?: ColorType

  constructor(ip: string, source?: SourceType) {
    this.ip = ip
    this.source = source
    this.color =
      source === 'Ali'
        ? 'red'
        : source === 'Arashi'
          ? 'blue'
          : source === 'Google'
            ? 'green'
            : undefined
  }
}

const url: Ref<string> = ref('')
const ipInfos: UnwrapNestedRefs<Set<IpInfo>> = reactive(new Set<IpInfo>())

async function resolutionStart(): Promise<void> {
  ipInfos.clear()

  const domain: string = url.value.replace(/^(https?:|ftp:)(\/\/)/, '').split('/')[0]
  if (domain && domain.toLowerCase() !== 'user ip') {
    await resolve(`https://dns.alidns.com/resolve?name=${domain}`, 'Ali')
    await resolve(`https://ns.net.kg/dns-query?name=${domain}`, 'Arashi')
    await resolve(`https://8.8.8.8/resolve?name=${domain}`, 'Google')
  } else {
    url.value = 'User IP'
    await resolve('https://jsonip.com')
  }
}

async function resolve(url: string, source?: SourceType): Promise<void> {
  await axios
    .get(url)
    .then((response) => {
      if (source)
        for (const answer of response.data.Answer) ipInfos.add(new IpInfo(answer.data, source))
      else ipInfos.add(new IpInfo(response.data.ip))
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
    <v-list-item
      v-for="ipInfo in ipInfos"
      :key="ipInfo.ip"
      :value="ipInfo.ip"
      :href="`http://${ipInfo.ip}`"
      :color="ipInfo.color"
      :base-color="ipInfo.color"
      >{{ ipInfo.ip }}</v-list-item
    >
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
