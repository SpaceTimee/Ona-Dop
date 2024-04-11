<script setup lang="ts">
import { ref, reactive, type Ref, type UnwrapNestedRefs } from 'vue'
import axios from 'axios'

type Source = 'Ali' | 'Arashi' | 'Google'
enum Reliability {
  Ali,
  Arashi,
  Google
}
enum Color {
  Ali = 'red',
  Arashi = 'blue',
  Google = 'green'
}

class IpInfo {
  readonly ip: string
  readonly source?: Source

  constructor(ip: string, source?: Source) {
    this.ip = ip
    this.source = source
  }
}

const url: Ref<string> = ref('')
const ipInfos: UnwrapNestedRefs<Array<IpInfo>> = reactive(new Array<IpInfo>())

async function resolutionStart(): Promise<void> {
  ipInfos.length = 0

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

async function resolve(url: string, source?: Source): Promise<void> {
  await axios
    .get(url)
    .then((response) => {
      if (source !== undefined)
        for (const answer of response.data.Answer) {
          const { deledFormer, pushedLatter } = replacingJudge(answer, source)
          if (deledFormer) ipInfos.splice(ipInfos.indexOf(deledFormer), 1)
          if (pushedLatter) ipInfos.push(pushedLatter)
        }
      else ipInfos.push(new IpInfo(response.data.ip))
    })
    .catch((error) => {
      console.error(error)
    })
}

function replacingJudge(answer: any, source: Source): { deledFormer?: IpInfo; pushedLatter?: IpInfo } { // skipcq: JS-0323
  for (const ipInfo of ipInfos)
    if (ipInfo.ip === answer.data)
      if (Reliability[ipInfo.source!] <= Reliability[source])
        return { deledFormer: ipInfo, pushedLatter: new IpInfo(answer.data, source) }
      else return {}

  return { pushedLatter: new IpInfo(answer.data, source) }
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
      :color="Color[ipInfo.source!]"
      :base-color="Color[ipInfo.source!]"
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
