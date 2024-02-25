<script setup lang="ts">
import type { ClassValue } from 'clsx'

interface PROPS {
  name: string
  val: string | undefined
  rules: string[]
}

const props = withDefaults(defineProps<PROPS>(), {
  name: '',
  value: undefined,
})

const val = ref('')

const changed = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement
  val.value = target.value
}

const computedValue = computed({
  get() {
    return val.value
  },
  set(v) {
    val.value = v
  },
})

onMounted(() => {
  if (props.val) {
    computedValue.value = props.value
  }
})
</script>

<template>
  <input v-bind="$props.rules" :value="computedValue" :class="cn('m-3', $attrs.class as ClassValue)" @change="changed">
</template>

<style scoped>

</style>
