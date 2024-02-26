<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const blogColumns = ref([
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

const store = useBlogsStore()
const items = ref([])

onMounted(async () => {
  await store.index()
  items.value = Object.values(store.getItems)
})

const goTo = (item) => {
  navigateTo(`/admin/blogs/${item.id}`)
}

const showCreateModal = ref(false)
const createBlog = () => {
  showCreateModal.value = true
}
</script>

<template>
  <div>
    <UiModal :show="showCreateModal" />
    <div class="flex flex-col">
      <div class="flex justify-between items-center my-2">
        <div class="text-2xl text-secondary-dark">
          Blogs
        </div>
        <UiButton variant="success" @click="createBlog">
          Create Blog
        </UiButton>
      </div>

      <p class="my-3 text-sm font-normal text-gray-500 dark:text-gray-400">
        Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.
      </p>
      <div class="mt-5 h-full">
        <UiTable :columns="blogColumns" :items="items" :pagination="false" @acted="goTo" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
