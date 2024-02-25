<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import type { ClassValue } from 'clsx'
import { cn } from '~/utils/cn'
import type { BUTTON_PROPS } from '~/types/UI/button'

const props = withDefaults(defineProps<BUTTON_PROPS>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  rounded: true,
  loading: false,
})

const defaultStyles = 'outline-none '

let btnSize = ''

switch (props.size) {
  case 'sm':
    btnSize = 'text-sm px-2 py-1'
    break
  case 'md':
    btnSize = 'text-md px-2 py-1'
    break
  case 'lg':
    btnSize = 'text-lg px-4 py-2'
    break
  case 'xl':
    btnSize = 'text-xl px-6 py-4'
    break
  default:
    btnSize = 'text-md px-2 py-1'
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
    :class="cn(defaultStyles, btnSize, btnVariant, rounded, $attrs.class as ClassValue)"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-10 animate-spin" />
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
