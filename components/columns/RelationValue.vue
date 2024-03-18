<script setup lang="ts">
import type { StrObj } from '~/types/objects'
import type { StateItem } from '~/types/store/defaults'

interface Props {
  active: StateItem
  options: { relation: string, key: string }
}
const props = defineProps<Props>()

const relationValue = ref('')

const relation = props.active[props.options.relation] as StrObj | undefined

if (relation && relation[props.options.key])
  relationValue.value = relation[props.options.key]
</script>

<template>
  <span>{{ relationValue }}</span>
</template>

<style scoped>

</style>
