<script setup lang="ts">
import type { defineComponent } from 'vue'
import type { PaginationType, StateItems } from '~/types/store/defaults'
import columnMap from '~/plugins/columnMap'

interface TableProps {
  columns: { label: string, key: string, sortable?: boolean, isComponent?: boolean, component?: string }[]
  items: { id: number | string }[] | StateItems
  pagination: PaginationType | false
  loading: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  items: () => [],
  loading: false,
})

const emit = defineEmits(['acted', 'pageChanged'])

const sort = ref({
  column: 'id',
  direction: 'asc',
})

const act = (item: object) => {
  emit('acted', item)
}

const q = ref('')

// const filteredRows = computed(() => {
//   if (!q.value) {
//     return props.items
//   }
//
//   return props.items.filter((person) => {
//     return Object.values(person).some((value) => {
//       return String(value).toLowerCase().includes(q.value.toLowerCase())
//     })
//   })
// })

const selectedColumns = ref([...props.columns])

const itemsNormalized = computed(() => Array.isArray(props.items) ? [...props.items] : Object.values(props.items))

const page = ref(1)
const pageCount = computed(() => props.pagination ? props.pagination.itemsPerPage : 15)
const total = computed(() => props.pagination ? props.pagination.totalItems : itemsNormalized.value.length)
const rows = computed(() => {
  let pageItems = []
  if (props.pagination && props.pagination.itemsByPage[page.value] && props.pagination.itemsByPage[page.value].length) {
    pageItems = props.pagination.itemsByPage[page.value]
      .map(id => itemsNormalized.value.find((item) => {
        return +item.id === +id
      }))
      .filter(item => item)
  }
  else {
    pageItems = itemsNormalized.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
  }

  return pageItems
})

watch(page, n => emit('pageChanged', n))
onBeforeUnmount(() => emit('pageChanged', 1))

const resolve = (componentName: string): ReturnType<typeof defineComponent> | undefined => {
  return columnMap[componentName]
}
</script>

<template>
  <div>
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter..." />
      <USelectMenu
        v-model="selectedColumns"
        :options="columns"
        multiple
        placeholder="Columns"
      />
    </div>
    <UTable
      :loading="loading"
      :sort="sort"
      :columns="selectedColumns"
      :rows="rows"
    >
      <template v-for="column in selectedColumns" :key="column.key" #[`${column.key}-data`]="{ row }">
        <template v-if="column.isComponent && column.component">
          <component :is="resolve(column.component)" :active="row" :options="column" class="cursor-pointer" @click="act(row)" />
        </template>

        <span v-else class="cursor-pointer" @click="act(row)">{{ row[column.key] }}</span>
      </template>
    </UTable>
    <div v-if="pagination" class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        size="md"
        :total="total"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
