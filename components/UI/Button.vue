<script setup lang="ts">
interface PROPS {
  type?: 'button' | 'submit' | undefined
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'outlined' | 'text'
  rounded?: boolean
}

const props = withDefaults(defineProps<PROPS>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  rounded: true,
})

let btnSize = ''

switch (props.size) {
  case 'sm':
    btnSize = 'px-2 py-1 text-sm'
    break
  case 'md':
    btnSize = 'px-2 py-1 text-md'
    break
  case 'lg':
    btnSize = 'px-2 py-1 text-lg'
    break
  case 'xl':
    btnSize = 'px-2 py-1 text-xl'
    break
  default:
    btnSize = 'px-2 py-1 text-md'
}

let btnVariant = ''
switch (props.variant) {
  case 'primary':
    btnVariant = 'bg-blue-500 text-white'
    break
  case 'outlined':
    btnVariant = 'border bg-transparent text-black'
    break
  case 'text':
    btnVariant = 'border-none bg-transparent text-black'
    break
}

const rounded = props.rounded ? 'border rounded-md' : 'border'
</script>

<template>
  <button
    :type="type"
    :class="[btnSize, btnVariant, rounded]"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
