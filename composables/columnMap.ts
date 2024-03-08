import RelationValue from '~/components/columns/RelationValue.vue'

export function useColumnMap(): Record<string, ReturnType<typeof defineComponent>> {
  return {
    columnsRelationValue: RelationValue,
  }
}
