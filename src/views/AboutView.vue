<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';
let domain = ref('');
let ips:Array<any> = reactive([]);

function domainResolve() {
  axios({
    url: `https://dns.alidns.com/resolve?name=${domain.value}`
  })
    .then((response) => {
      ips.length = 0;
      for (const answer of response.data.Answer)
        ips.unshift(answer.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('finally');
    });
}
</script>

<template>
  <div class="about">
    <input v-model="domain" />
    <button @click="domainResolve" />
    <ul>
        <li v-for="ip in ips" :key="ip">{{ ip }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
