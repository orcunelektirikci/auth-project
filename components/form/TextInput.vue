<script setup lang="ts">
interface Props {
  variant?: 'underline' | 'default'
  name?: string
  label?: string
  type?: 'text' | 'password' | 'email' | 'tel'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  name: '',
  label: '',
  type: 'text',
})

const modelValue = defineModel()

const ui = computed(() => {
  switch (props.variant) {
    case 'underline':
      return {
        base: 'border-0 border-b-[1px]',
        rounded: 'rounded-none',
      }
    default:
      return undefined
  }
})
</script>

<template>
  <UFormGroup :label="label" :name="name">
    <UInput
      v-model="modelValue"
      :variant="variant === 'default' ? 'outline' : 'none'"
      :type
      :ui
    />
  </UFormGroup>
</template>

<style scoped>

</style>
