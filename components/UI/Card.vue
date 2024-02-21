<script setup lang="ts">
import type { CARD_PROPS } from '~/types/UI/card'

withDefaults(defineProps<CARD_PROPS>(), { title: undefined })

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
