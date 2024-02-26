<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const columns = ref([
  {
    key: 'id',
    text: 'ID',
  },
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'email',
    text: 'E-mail',
  },
])

const storeName = 'users'
</script>

<template>
  <DisplaysIndexPage
    :columns
    :store-name="storeName"
  />
</template>

<style scoped>

</style>
