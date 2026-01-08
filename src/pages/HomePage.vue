<script setup lang="ts">
import { ref, reactive, type Ref, type UnwrapNestedRefs } from 'vue'
import axios from 'axios'

type Resolver = {
  source: string
  endpoint: string
  color: string
}

const RESOLVERS = [
  { source: 'Ali', endpoint: 'https://dns.alidns.com/resolve?name=', color: 'red' },
  { source: 'Arashi', endpoint: 'https://ns.net.kg/dns-query?name=', color: 'blue' },
  { source: 'Google', endpoint: 'https://prox.spacetimee.xyz/~/dns.google/resolve?name=', color: 'green' }
] as const satisfies ReadonlyArray<Resolver>

type Source = (typeof RESOLVERS)[number]['source']

const SOURCE_RELIABILITY: Record<Source, number> = Object.fromEntries(
  RESOLVERS.map((resolver, index) => [resolver.source, index])
) as Record<Source, number>

const SOURCE_COLOR: Record<Source, string> = Object.fromEntries(
  RESOLVERS.map((resolver) => [resolver.source, resolver.color])
) as Record<Source, string>

class IpInfo {
  readonly ip: string
  readonly source?: Source

  constructor(ip: string, source?: Source) {
    this.ip = ip
    this.source = source
  }
}

const query: Ref<string> = ref('')
const ipInfos: UnwrapNestedRefs<Array<IpInfo>> = reactive<IpInfo[]>([])

async function resolveQuery(): Promise<void> {
  ipInfos.length = 0

  const domain: string =
    query.value
      .trim()
      .replace(/^[a-z]+:\/\//i, '')
      .split('/')[0]
      ?.split(':')[0] ?? ''
  if (domain && domain.toLowerCase() !== 'user ip') {
    for (const { source, endpoint } of RESOLVERS) await resolve(`${endpoint}${domain}`, source)
    return
  }

  query.value = 'User IP'
  await resolve('https://prox.spacetimee.xyz/~/jsonip.com')
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

interface DnsAnswer {
  data: string
}

// skipcq: JS-0323
function replacingJudge(answer: DnsAnswer, source: Source): { deledFormer?: IpInfo; pushedLatter?: IpInfo } {
  for (const ipInfo of ipInfos)
    if (ipInfo.ip === answer.data)
      if (SOURCE_RELIABILITY[ipInfo.source!] <= SOURCE_RELIABILITY[source])
        return { deledFormer: ipInfo, pushedLatter: new IpInfo(answer.data, source) }
      else return {}

  return { pushedLatter: new IpInfo(answer.data, source) }
}
</script>

<template>
  <v-card class="search-v-card">
    <v-text-field
      v-model="query"
      variant="solo"
      hide-details
      label="Gimme Ur URL"
      autofocus
      @keyup.enter="resolveQuery"
    />
    <v-btn class="search-v-btn" @click="resolveQuery">Resolve</v-btn>
  </v-card>
  <v-list class="text-body-2" lines="one" density="compact">
    <v-list-item
      v-for="ipInfo in ipInfos"
      :key="ipInfo.ip"
      :value="ipInfo.ip"
      :href="`http://${ipInfo.ip}`"
      :color="SOURCE_COLOR[ipInfo.source!]"
      :base-color="SOURCE_COLOR[ipInfo.source!]"
    >
      {{ ipInfo.ip }}
    </v-list-item>
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
