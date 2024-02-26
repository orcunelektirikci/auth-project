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
    key: 'title',
    text: 'Title',
  },
  {
    key: 'name',
    relation: 'author',
    text: 'Author',
  },
])

const storeName = 'blogs'
</script>

<template>
  <DisplaysIndexPage
    :columns
    :store-name="storeName"
  />
</template>

<style scoped>

</style>
