import type { Component } from 'vue'
import AutocompleteInput from '~/components/form/AutocompleteInput.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import TextInput from '~/components/form/TextInput.vue'
import TextareaInput from '~/components/form/TextareaInput.vue'
import type { StrKeyObj } from '~/types/objects'

export const formFieldsMap: StrKeyObj<Component> = {
  text: TextInput,
  textarea: TextareaInput,
  checkbox: Checkbox,
  autocomplete: AutocompleteInput,
}

function resolveFormComponent(componentName: string): Component | null {
  return componentName in formFieldsMap ? (formFieldsMap[componentName]) : null
}

export default resolveFormComponent
