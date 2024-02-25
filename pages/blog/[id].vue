<script setup lang="ts">
import type { BLOG } from '~/types/store/blogs'

const { t } = useI18n()

const store = useBlogsStore()
const route = useRoute()
const blog = ref<BLOG>()

onMounted(async () => {
  await store.show(route.params.id as string)
  blog.value = store.find(route.params.id as string) as BLOG

  if (!blog.value) {
    throw createError({ statusCode: 404, message: t('blogs.404', { id: route.params.id }), fatal: true })
  }
})
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div v-if="blog">
      <div>Author: {{ blog.author?.name }}</div>
      <div>{{ blog.title }}</div>
      <div>{{ blog.body }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
