<script setup lang="ts">
const store = useBlogsStore()
onMounted(async () => {
  await store.index()
})

const { t } = useI18n()
useHead({
  title: t('blogs.head.title'),
})
</script>

<template>
  <div class="">
    <div class="flex flex-col gap-y-2 mt-2">
      <div v-for="(blog) in store.getItems" :key="blog.id">
        <NuxtLink :to="`/blog/${blog.id}`">
          {{ blog.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
