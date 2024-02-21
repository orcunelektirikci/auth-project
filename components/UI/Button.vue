<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import type { BUTTON_PROPS } from '~/types/UI/button'

const props = withDefaults(defineProps<BUTTON_PROPS>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  rounded: true,
  loading: false,
})

const defaultStyles = 'outline-none px-2 py-1 '

let btnSize = ''

switch (props.size) {
  case 'sm':
    btnSize = 'text-sm'
    break
  case 'md':
    btnSize = 'text-md'
    break
  case 'lg':
    btnSize = 'text-lg'
    break
  case 'xl':
    btnSize = 'text-xl'
    break
  default:
    btnSize = 'text-md'
}

let btnVariant = ''
switch (props.variant) {
  case 'primary':
    btnVariant = 'bg-primary text-white'
    break
  case 'secondary':
    btnVariant = 'bg-secondary text-white'
    break
  case 'outlined':
    btnVariant = 'border bg-transparent text-primary'
    break
  case 'text':
    btnVariant = 'border-none bg-transparent text-primary'
    break
}

const rounded = props.rounded ? 'border rounded-md' : 'border'
</script>

<template>
  <button
    :type="type"
    :class="[defaultStyles, btnSize, btnVariant, rounded]"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-10 animate-spin" />
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
