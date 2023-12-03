<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

const url: any = ref('')
const ips: Array<any> = reactive([])

async function resolutionStart() {
  ips.length = 0

  const domain: string = url.value.replace(/^(https?:|ftp:)(\/\/)/, '').split('/')[0]
  await resolve(`https://dns.alidns.com/resolve?name=${domain}`)
  await resolve(`https://ns.net.kg/dns-query?name=${domain}`)
  await resolve(`https://8.8.8.8/resolve?name=${domain}`)
}

async function resolve(url: string) {
  await axios
    .get(url)
    .then((response) => {
      for (const answer of response.data.Answer)
        if (!ips.includes(answer.data)) ips.push(answer.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="search-div">
    <input
      class="search-input"
      v-model="url"
      placeholder="Gimme Ur URL"
      @keypress.enter="resolutionStart"
    />
    <button class="search-button" @click="resolutionStart">Resolve</button>
  </div>
  <ul>
    <li class="ip-li" v-for="ip in ips" :key="ip">{{ ip }}</li>
  </ul>
</template>

<style scoped>
.search-div {
  display: flex;
  padding: 0.6rem;
  margin: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #00bd7e;
  color: white;
}

.search-input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.search-button {
  padding: 0.6rem;
  margin-left: 0.6rem;
  background-color: #00bd7e;
  color: #fff;
  border: 1px solid white;
  border-radius: 6px;
  cursor: pointer;
}

.ip-li {
  margin-top: 0.6rem;
}
</style>
