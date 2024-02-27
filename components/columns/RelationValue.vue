<script setup lang="ts">
interface Props {
  active: Record<string, any>
  options: { relation: string, key: string }
}
const props = defineProps<Props>()

const relationValue = ref('')

if (props.active[props.options.relation] && props.active[props.options.relation][props.options.key]) {
  relationValue.value = props.active[props.options.relation][props.options.key]
}

console.log({ relationValue: relationValue.value })
</script>

<template>
  <span>{{ relationValue }}</span>
</template>

<style scoped>

</style>
