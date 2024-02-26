import { useApi } from '~/composables/useApi'
import type { Item, StateItems, StoreType } from '~/types/store/defaults'

export default {
  // Todo:: this need to be tested
  merge(this: StoreType, resource: StateItems) {
    const newState = JSON.parse(JSON.stringify(this.items))
    for (const r in resource) {
      const oldObj = this.items[r] || Object.create({})
      newState[r] = Object.assign({}, oldObj, resource[r])
    }
    this.items = newState
  },
  //
  async index(this: StoreType) {
    const response = await useApi().sendRequest(this.storeName)

    if (response.data)
      this.items = response.data
  },
  async show(this: StoreType, id: number) {
    const response = await useApi().sendRequest(`${this.storeName}/${id}`)

    if (response.data) {
      const index = Object.values(this.items).findIndex((item: StateItems) => item.id === response.data.id)
      if (index !== -1)
        this.items[index] = { ...response.data }
      else
        this.merge({ ...response.data })
    }
  },
  async create(this: StoreType, body: Record<string, any>) {
    const response = await useApi().sendRequest(this.storeName, {
      method: 'post',
      body,
    })

    if (response.data) {
      this.merge({ ...response.data })
      useToastMessage(200, useI18n().t('success.resourceCreated')).showSuccess()
    }
  },
  async update(this: StoreType, id: number, body: Record<string, any>) {
    const response = await useApi().sendRequest(this.storeName, {
      method: 'put',
      body,
    })

    if (response.data) {
      const index = Object.values(this.items).findIndex((item: Item) => item.id === response.data.id)
      if (index !== -1) {
        this.items[index] = { ...response.data }
        useToastMessage(200, useI18n().t('success.resourceUpdated')).showSuccess()
      }
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
