<script setup lang="ts">
import type { StoreDefinition } from 'pinia'
import type { StateItem } from '~/types/store/defaults'
import availableStores from '~/stores'
import CreateModal from '~/components/resource/CreateModal.vue'

interface Props {
  storeName: string
  detailText?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

if (!Object.prototype.hasOwnProperty.call(availableStores, props.storeName))
  throw createError({ statusCode: 404, message: t('errors.notFound'), fatal: true })

const store = (availableStores as Record<string, () => ReturnType<StoreDefinition>>)[props.storeName]

const columns = store().getTableColumns
const pagination = store().getPagination
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await store().setPagination({ current_page: 1 })
  await store().index()
  loading.value = false
})

function goTo(item: StateItem) {
  return navigateTo(`/admin/${props.storeName}/${item.id}`)
}

const modal = useModal()
const count = ref(0)

function showCreate() {
  count.value += 1
  modal.open(CreateModal, {
    store: props.storeName,
  })
}

const pluralTitle = t(store().getPluralTitle)
const singularTitle = t(store().getSingularTitle)

async function handlePageChange(page: number) {
  loading.value = true
  await store().setPagination({ current_page: page })
  await store().index({ page })
  loading.value = false
}

const items = computed(() => Object.values(store().items))
</script>

<template>
  <div>
    <UiModal :show="showCreate" />
    <div class="flex flex-col">
      <div class="flex justify-between items-center my-2">
        <div class="text-2xl text-secondary-dark">
          {{ pluralTitle }}
        </div>
        <UButton :label="t('general.createResource', { resourceName: singularTitle })" @click="showCreate" />
      </div>

      <p v-if="detailText" class="my-3 text-sm font-normal text-gray-500 dark:text-gray-400">
        {{ detailText }}
      </p>
      <div class="mt-5 h-full">
        <UiTable
          :loading="loading"
          :columns="columns"
          :items="items"
          :pagination="pagination"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
          @acted="goTo"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
