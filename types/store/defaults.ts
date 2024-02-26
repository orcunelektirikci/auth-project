import type { ComputedRef } from 'vue'

export interface PaginationType {
  itemsPerPage: number
  currentPage: number
  pageCount: number
}

interface HasId {
  id: number | string
}

export type Item = HasId & Record<string, any>

export type StateItems = Record<number | string, Item>

export interface TitleType {
  singular: string
  plural: string
}

export interface State {
  items: StateItems
  storeName: string
  pagination: PaginationType
  title: TitleType
}

export interface Actions {
  merge: (this: ThisType<any>, resource: Record<string, any>) => void
}

export interface Getters {
  getItems: ComputedRef<Record<string, any>[]>
  find: ComputedRef<Record<string, any>>
  getTitle: (type: string) => string
}

export interface StoreType extends State, Actions, Getters {}
