import { useApi } from '~/composables/useApi'
import type { Item, StateItems, StoreType } from '~/types/store/defaults'
import { normalizeResource } from '~/utils/helpers'

export default {
  // Todo:: this need to be tested
  merge(this: StoreType, resource: StateItems[]) {
    const newState = JSON.parse(JSON.stringify(this.items))
    for (const r in resource) {
      const oldObj = this.items[r] || Object.create({})
      newState[r] = Object.assign({}, oldObj, resource[r])
    }
    this.items = newState
  },
  //
  setPagination(this: StoreType, { current_page, last_page, total, per_page }: { current_page?: number, last_page?: number, total?: number, per_page?: number }, idsInPage: Array<number>,
  ) {
    this.pagination.currentPage = current_page || 1
    this.pagination.lastPage = last_page || 1
    this.pagination.totalItems = total || 0
    this.pagination.itemsPerPage = per_page || 2
    this.pagination.itemsByPage[this.pagination.currentPage] = idsInPage
  },
  async index(this: StoreType, params: Record<string, string | number> = {}) {
    const response = await useApi().sendRequest(this.storeName, { params })

    if (response.data) {
      const normalized = normalizeResource(response.data)

      if (response.meta)
        this.setPagination(response.meta, Object.keys(normalized))

      this.merge(normalized)
    }
  },
  async show(this: StoreType, id: number) {
    const response = await useApi().sendRequest(`${this.storeName}/${id}`)

    if (response.data)
      this.merge(normalizeResource(response.data))
  },
  async create(this: StoreType, body: Record<string, any>) {
    const response = await useApi().sendRequest(this.storeName, {
      method: 'post',
      body,
    })

    if (response.data) {
      this.merge(normalizeResource(response.data))
      useToastMessage(200, useI18n().t('success.resourceCreated')).showSuccess()
    }
  },
  async update(this: StoreType, id: number, body: Record<string, any>) {
    const response = await useApi().sendRequest(this.storeName, {
      method: 'put',
      body,
    })

    if (response.data) {
      this.merge(normalizeResource(response.data))
      useToastMessage(200, useI18n().t('success.resourceUpdated')).showSuccess()
    }
  },
  async delete(this: StoreType, id: number) {
    const response = await useApi().sendRequest(`${this.storeName}/${id}`, {
      method: 'delete',
    })

    if (response.data) {
      const index = Object.values(this.items).findIndex((item: Item) => item.id === response.data.id)
      if (index !== -1) {
        delete this.items[id]
        useToastMessage(200, useI18n().t('success.resourceDeleted')).showSuccess()
      }
    }
  },
}
