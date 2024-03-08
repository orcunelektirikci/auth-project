import type { ComputedRef } from 'vue'
import type { Dictionary, NumKeyObj, NumKeyObjArr, Obj } from '~/types/objects'

export interface PaginationType {
  itemsPerPage: number
  currentPage: number
  lastPage: number
  totalItems: number
  itemsByPage: NumKeyObjArr<number>
}

export interface HasId {
  id: number | string
}

export interface StateItem extends HasId,
  Record<string | number, string | number | Obj<unknown> | Array<string | number | Obj<unknown>>> {}

export type StateItems = NumKeyObj<StateItem>

export interface TitleType {
  singular: string
  plural: string
}

export interface RelationObject {
  key: string
  store: string
}

export interface State {
  items: StateItems
  model: {
    relationships: RelationObject[]
    storeName: string
    pagination: PaginationType
    title: TitleType
    table: {
      columns: Dictionary[]
    }
    form: object
  }
}

export interface Actions {
  merge: (this: ThisType<any>, resource: Dictionary) => void
  setPagination: (this: ThisType<any>, pagination: PaginationType, idsInPage: string[]) => void
  index: (this: ThisType<any>, params: Obj<unknown>) => void
}

export interface Getters {
  getItems: ComputedRef<Dictionary[]>
  find: ComputedRef<Dictionary>
  getPluralTitle: (type: string) => string
  getSingularTitle: (type: string) => string
}

export interface StoreType extends State, Getters, Actions {}
