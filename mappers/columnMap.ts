import type { Component } from 'vue'
import RelationValue from '~/components/columns/RelationValue.vue'
import type { StrKeyObj } from '~/types/objects'

export const columnMap: StrKeyObj<Component> = {
  columnsRelationValue: RelationValue,
}

function resolve(componentName: string): Component | null {
  return componentName in columnMap ? (columnMap[componentName]) : null
}

export default resolve
