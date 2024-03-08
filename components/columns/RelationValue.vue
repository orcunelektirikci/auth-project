<script setup lang="ts">
import type { StateItem } from '~/types/store/defaults'

interface Props {
  active: StateItem
  options: { relation: string, key: string }
}
const props = defineProps<Props>()

const relationValue = ref('')

if (props.active[props.options.relation] && props.active[props.options.relation][props.options.key])
  relationValue.value = props.active[props.options.relation][props.options.key]
</script>

<template>
  <span>{{ relationValue }}</span>
</template>

<style scoped>

</style>
