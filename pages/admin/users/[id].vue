<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})
const route = useRoute()
</script>

<template>
  <div>User: {{ route.params.id }}</div>
</template>

<style scoped>

</style>
