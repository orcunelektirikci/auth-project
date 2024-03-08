<script setup lang="ts">
interface Props {
  name?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
})

const modelValue = defineModel()
</script>

<template>
  <UCheckbox
    v-model="modelValue"
    :label
    :name
  />
</template>

<style scoped>

</style>
