<template>
  <div>
    <ul>
      <li v-for="link in links">
        <nuxt-link :key="link" :to="{ name: link }" v-text="link" />
      </li>
    </ul>
    <hr>
    <nuxt />
  </div>
</template>
<script setup>
const links = ['index', 'fetch', 'cache-only', 'fetch-object', 'fetch-random']
</script>