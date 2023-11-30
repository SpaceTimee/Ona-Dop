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
  text-align: center;
}

.search-box {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 200px;
}

.search-button {
  padding: 0.6rem;
  margin-left: 0.3rem;
  background-color: #00BD7E;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
