<script setup lang="ts">
import { ref } from 'vue'
import resolveFormComponent from '~/mappers/formComponentsMap'
import { availableStores } from '~/stores'
import type { Arr, StrKeyObj } from '~/types/objects'

interface Props {
  storeName: keyof typeof availableStores
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'submitted'): void
}>()

const store = availableStores[props.storeName]()

const formElements = store.getFormFields

function layoutClasses(element: any) {
  let layoutClasses = ''
  for (const breakpoint in element.layout)
    layoutClasses += ` ${breakpoint}:w-${element.layout[breakpoint]}`

  return `${layoutClasses} w-full`
}

const state = ref<StrKeyObj<string | number | Arr<any>>>({})
for (const element of formElements)
  state.value[element.field] = element.defaultValue || undefined

const { schema } = useValidationSchema(formElements)

async function submitForm() {
  const validated = schema.value.safeParse(state.value)
  if (validated.success) {
    const response = await store.create(validated.data)
    if (!response.error)
      emit('submitted')
  }
}
</script>

<template>
  <UForm :state="state" :schema="schema">
    <div class="w-full h-full flex flex-wrap">
      <div
        v-for="element in formElements"
        :key="element.id"
        class="p-2"
        :class="layoutClasses(element)"
      >
        <component
          :is="resolveFormComponent(element.component)"
          v-model="state[element.field]"
          variant="underline"
          :name="element.field"
          :label="element.label"
          :type="element.type"
          :config="element.config"
        />
      </div>
    </div>

    <div class="w-full flex items-center justify-end mt-6">
      <UButton
        type="submit"
        variant="solid"
        color="success"
        size="lg"
        icon="i-heroicons-arrow-right-16-solid"
        @click="submitForm"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
