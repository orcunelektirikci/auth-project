<script setup lang="ts">
import type { ClassValue } from 'clsx'
import type { CARD_PROPS } from '~/types/UI/card'
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<CARD_PROPS>(), {
  title: undefined,
  borderColor: 'border-primary',
  elevation: 'md',
  rounded: 'md',
})

const elevationClass = props.elevation === false ? 'shadow-none' : `shadow-${props.elevation}`
const roundedClass = props.rounded === false ? 'rounded-0' : `rounded-${props.elevation}`

const slots = useSlots()
const titleSlotHasContent = computed(() => Object.prototype.hasOwnProperty.call(slots, 'title'))
</script>

<template>
  <div :class="cn(borderColor, elevationClass, roundedClass, 'p-6', $attrs.class as ClassValue)">
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
