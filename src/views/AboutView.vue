<script setup lang="ts">
</script>

<template>
  <main>
    <h1 class="AboutHeader">Ona Dop</h1>
    <ul>
      <li>
        <p>Developer: Space Time</p>
      </li>
      <li>
        <p>Blog: <a href="https://blog.spacetimee.xyz" target="_blank"
            rel="noopener noreferrer">https://blog.spacetimee.xyz</a></p>
      </li>
      <li>
        <p>Version: 0.0.0 (Demo)</p>
      </li>
    </ul>
  </main>
</template>

<style>
.AboutHeader {
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #00BD7E;
  color: white;
}

@media (min-width: 1024px) {
  .AboutHeader {
    text-align: center;
  }
}

p {
  margin-top: 0.6rem;
}
</style>
