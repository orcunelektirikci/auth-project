<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), { title: undefined })

const slots = useSlots()
const titleSlotHasContent = computed(() => Object.prototype.hasOwnProperty.call(slots, 'title'))
</script>

<template>
  <div class="border-slate-50 rounded-md border-black shadow-md p-6">
    <div v-if="titleSlotHasContent">
      <slot name="title" />
    </div>
    <div v-if="title" class="border-b mb-3">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>
