<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';

const domain = ref('');
const ips: Array<any> = reactive([]);

function domainResolve() {
  axios.get(`https://dns.alidns.com/resolve?name=${domain.value.replace(/^(https?:|ftp:)(\/\/)/, '')}`)
    .then((response) => {
      ips.length = 0;
      for (const answer of response.data.Answer)
        ips.push(answer.data);
    })
    .catch((error) => {
      alert(error);
    })
}
</script>

<template>
  <div class="search-container">
    <input class="search-box" v-model="domain" placeholder="Gimme your Domain" @keypress.enter="domainResolve" />
    <button class="search-button" @click="domainResolve">Resolve</button>
  </div>
  <ul>
    <li v-for="ip in ips" :key="ip">{{ ip }}</li>
  </ul>
</template>

<style scoped>
.search-container {
  display: flex;
  padding: 0.6rem;
  margin: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #00BD7E;
  color: white;
}

.search-box {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.search-button {
  padding: 0.6rem;
  margin-left: 0.6rem;
  background-color: #00BD7E;
  color: #fff;
  border: 1px solid white;
  border-radius: 6px;
  cursor: pointer;
}

li {
  margin-top: 0.6rem;
}
</style>
