import { normalizeResource } from './helpers'
import { useApi } from '~/composables/useApi'
import type { Actions, HasId, StateItem, StateItems, StoreType } from '~/types/store/defaults'
import type { Arr, TypableObj } from '~/types/objects'

const globalActions: Actions = {
  merge(this: StoreType, resource: StateItems) {
    const newState = JSON.parse(JSON.stringify(this.items)) as StateItems
    for (const r in resource) {
      const oldObj = this.items[r] || Object.create({})
      newState[r] = Object.assign({}, oldObj, resource[r])
    }
    this.items = newState
  },
  //
  setPagination(this: StoreType, { current_page, last_page, total, per_page }, idsInPage: Arr<number>,
  ) {
    this.model.pagination.currentPage = current_page || 1
    this.model.pagination.lastPage = last_page || 1
    this.model.pagination.totalItems = total || 0
    this.model.pagination.itemsPerPage = per_page || 2
    this.model.pagination.itemsByPage[this.model.pagination.currentPage] = idsInPage
  },
  async index(this: StoreType, params: TypableObj = {}) {
    const response = await useApi().sendRequest(this.model.storeName, { params })

    if ('data' in response && response.data) {
      const normalized = normalizeResource(response.data)

      if (response.meta)
        this.setPagination(response.meta, Object.keys(normalized).map(k => Number(k)))

      this.merge(normalized)
    }
  },
  async show(this: StoreType, id) {
    const response = await useApi().sendRequest(`${this.model.storeName}/${id}`)

    if ('data' in response && response.data)
      this.merge(normalizeResource(response.data))
  },
  async create(this: StoreType, body) {
    const response = await useApi().sendRequest(this.model.storeName, {
      method: 'post',
      body,
    })

    if ('data' in response && response.data) {
      this.merge(normalizeResource(response.data))
      useToastMessage(useI18n().t('success.resourceCreated'), 200).showSuccess()
    }
  },
  async update(this: StoreType, id, body) {
    const response = await useApi().sendRequest(this.model.storeName, {
      method: 'put',
      body,
    })

    if ('data' in response && response.data) {
      this.merge(normalizeResource(response.data))
      useToastMessage(useI18n().t('success.resourceUpdated'), 200).showSuccess()
    }
  },
  async delete(this: StoreType, id: number) {
    const response = await useApi().sendRequest(`${this.model.storeName}/${id}`, {
      method: 'delete',
    })

    if ('data' in response && response.data) {
      let index = -2
      index = Object.values(this.items).findIndex((item: StateItem) => item.id === (response.data as HasId).id)

      if (index !== -1) {
        delete this.items[id]
        useToastMessage(useI18n().t('success.resourceDeleted'), 200).showSuccess()
      }
    }
  },
}

export default globalActions
