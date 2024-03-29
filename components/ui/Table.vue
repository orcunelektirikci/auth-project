<script setup lang="ts">
import resolve from '~/mappers/columnMap'
import type { TableColumn } from '~/types/UI/table'
import type { PaginationType, StateItems } from '~/types/store/defaults'
import { objHas } from '~/utils/helpers'

interface TableProps {
  columns: TableColumn[]
  items: { id: number | string }[] | StateItems
  pagination: PaginationType | false
  loading: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  items: () => [],
  loading: false,
})

const emit = defineEmits<TableEmits>()
interface TableEmits {
  (e: 'acted', item: object): void
  (e: 'pageChanged', page: number): void
}

const sort = ref({
  column: 'id',
  direction: 'asc',
})

function act(item: object) {
  emit('acted', item)
}

const q = ref('')

const selectedColumns = ref([...props.columns])
const orderedColumns = computed(() => selectedColumns.value.sort((a: TableColumn, b: TableColumn) => a.order - b.order) as TableColumn[])

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

onMounted(async () => {
  setTimeout(async () => {
    if (props.pagination) {
      const query = useRoute().query
      if (objHas(query, 'page')) {
        if (Number(query.page) > Number(props.pagination.lastPage)) {
          page.value = props.pagination.lastPage
          await useRouter().replace({
            query: { ...useRoute().query, page: page.value },
          })
        }

        else if (Number(query.page) < 1) {
          page.value = 1
          await useRouter().replace({
            query: { ...useRoute().query, page: page.value },
          })
        }

        else if (Number(query.page) !== page.value) {
          page.value = Number(query.page)
        }
      }
      else {
        page.value = 1
        await useRouter().replace({
          query: { ...useRoute().query, page: page.value },
        })
      }
    }
  }, 150)
})

watch(page, (n) => {
  if (props.pagination) {
    useRouter().replace({
      query: { ...useRoute().query, page: n },
    })
  }
  emit('pageChanged', n)
})
onBeforeUnmount(() => emit('pageChanged', 1))
</script>

<template>
  <div>
    <div class="flex justify-end gap-x-1.5 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Full Text Search..." />
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
      :columns="orderedColumns"
      :rows="rows"
    >
      <template v-for="column in orderedColumns" :key="column.key" #[`${column.key}-data`]="{ row }">
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
~/mappers/columnMap
