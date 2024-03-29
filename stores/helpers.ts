import type { StoreDefinition } from 'pinia'
import { availableStores } from '~/stores'
import type { Dictionary, NumKeyObj } from '~/types/objects'
import type { HasId, RelationObject, StateItem, StateItems } from '~/types/store/defaults'

export function normalizeResource(resource: Array<HasId> | HasId): StateItems {
  const normalized = {} as Record<number, HasId>

  if (Array.isArray(resource)) {
    resource.forEach((r) => {
      normalized[Number(r.id)] = r
    })
  }
  else {
    normalized[Number(resource.id)] = resource
  }

  return <NumKeyObj<StateItem>>normalized
}

export function populateRelations(relations: RelationObject[], item: StateItem): StateItem {
  const relationshipMap = relations.map((rel) => {
    const result = {} as Dictionary
    const store = (availableStores as Record<string, () => ReturnType<StoreDefinition>>)[rel.store]

    if (!store) {
      result[rel.key] = item[rel.key]
    }
    else {
      const relatedItems = store().items as StateItems

      if (Array.isArray(item[rel.key])) {
        result[rel.key] = (item[rel.key] as Array<any>)
          .map((i: number) => relatedItems[i])
          .filter((i: StateItem | undefined | null) => i)
      }
      else { result[rel.key] = relatedItems[rel.key] }
    }

    return result
  })

  return { ...item, ...relationshipMap }
}
