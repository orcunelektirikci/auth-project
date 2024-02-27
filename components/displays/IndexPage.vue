<script setup lang="ts">
import type { StoreDefinition } from 'pinia'
import type { Item } from '~/types/store/defaults'
import availableStores from '~/stores'

interface Props {
  storeName: string
  columns: { text: string, key: string, relation?: string }[]
  detailText?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

if (!Object.prototype.hasOwnProperty.call(availableStores, props.storeName)) {
  throw createError({ statusCode: 404, message: t('errors.notFound') })
}

const store = (availableStores as Record<string, () => ReturnType<StoreDefinition>>)[props.storeName]()

console.log({ store })
const items = ref([])

onMounted(async () => {
  await store.index()
  items.value = Object.values(store.getItems)
})

const goTo = (item: Item) => {
  navigateTo(`/admin/${props.storeName}/${item.id}`)
}

const showCreateModal = ref(false)
const showCreate = () => {
  showCreateModal.value = true
}

const pluralTitle = t(store.getPluralTitle)
const singularTitle = t(store.getSingularTitle)
</script>

<template>
  <div>
    <UiModal :show="showCreateModal" />
    <div class="flex flex-col">
      <div class="flex justify-between items-center my-2">
        <div class="text-2xl text-secondary-dark">
          {{ pluralTitle }}
        </div>
        <UiButton variant="success" @click="showCreate">
          {{ t('general.createResource', { resourceName: singularTitle }) }}
        </UiButton>
      </div>

      <p v-if="detailText" class="my-3 text-sm font-normal text-gray-500 dark:text-gray-400">
        {{ detailText }}
      </p>
      <div class="mt-5 h-full">
        <UiTable :columns="columns" :items="items" :pagination="false" @acted="goTo" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
