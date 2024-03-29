import type { TableColumn } from '~/types/UI/table'
import type { FormField } from '~/types/form'
import type { Arr, Dictionary, NumKeyObj, NumKeyObjArr, Obj, StrKeyObj, TypableObj } from '~/types/objects'
import type { HttpResponse } from '../response'

export interface PaginationType {
  itemsPerPage: number
  currentPage: number
  lastPage: number
  totalItems: number
  itemsByPage: NumKeyObjArr<number>
}

export interface HasId {
  id: number | string
  [key: string | number | symbol]: any
}

export interface StateItem extends HasId,
  Record<string | number, undefined | string | number | Obj<unknown> | Array<string | number | Obj<unknown>>> {}

export type StateItems = NumKeyObj<StateItem>

export interface TitleType {
  plural: string
  singular: string
}

export interface RelationObject {
  key: string
  store: string
}

export interface StateModel {
  relationships: RelationObject[]
  storeName: string
  pagination: PaginationType
  title: TitleType
  table: {
    columns: TableColumn[]
  }
  form: {
    fields: FormField[]
  }
}

export interface State extends StrKeyObj<any> {
  items: StateItems
  model: StateModel
}

export interface ApiPaginationResponse {
  current_page?: number
  last_page?: number
  total?: number
  per_page?: number
}

export interface Actions {
  merge: (resource: StateItems) => void
  setPagination: (pagination: ApiPaginationResponse, idsInPage: Arr<number>) => void
  index: (params: TypableObj) => Promise<void>
  search: (params: TypableObj) => Promise<object | object[] | null>
  show: (id: number | string) => Promise<void>
  create: (body: Dictionary) => Promise<HttpResponse>
  update: (id: number, body: Dictionary) => Promise<void>
  delete: (id: number) => Promise<void>
}

type FindFn = (itemToFind: number | string | StateItem) => StateItem | undefined

export interface Getters {
  find: (state: State) => FindFn
  getItems: (state: State) => StateItem[]
  getPluralTitle: (state: State) => string
  getSingularTitle: (state: State) => string
  getTableColumns: (state: State) => TableColumn[]
  getPagination: (state: State) => PaginationType
  getFormFields: (state: State) => FormField[]
}

export interface StoreType extends State, Getters, Actions {}
