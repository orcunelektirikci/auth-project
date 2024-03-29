<script setup lang="ts">
interface Props {
  variant?: 'underline' | 'default'
  name?: string
  label?: string
  config?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  name: '',
  label: '',
  type: 'text',
  config: {},
})

const modelValue = defineModel()

const ui = computed(() => {
  switch (props.variant) {
    case 'underline':
      return {
        base: 'border-0 border-b-[1px]',
        rounded: 'rounded-none',
      }
    default:
      return undefined
  }
})

const loading = ref(false)

const relationStore = availableStores[props.config.relatedResource]()

const items = ref([])

async function search(q: string) {
  loading.value = true
  const params = {
    term: q || '',
    fields: props.config.searchFields.join(','),
  }
  const results = await relationStore.search(params)

  loading.value = false

  const ret = results.map((item: any) => ({
    id: `${item.id}`,
    label: item[props.config.labelField],
  }))

  items.value = ret
  return ret
}

// onMounted(async () => {
//   const item = await relationStore.show(modelValue.value)
//   if (item) {
//     modelValue.value = {
//       id: item.id,
//       label: item[props.config.labelField],
//     }
//   }
// })
</script>

<template>
  <UFormGroup :label="label" :name="name">
    <UInputMenu
      v-model="modelValue"
      :variant="variant === 'default' ? 'outline' : 'none'"
      :loading="loading"
      :ui
      v-bind="config"
      :search
      :options="items"
      :debounce="500"
      value-attribute="id"
    />
  </UFormGroup>
</template>

<style scoped>

</style>
