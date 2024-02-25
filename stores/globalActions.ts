import { useApi } from '~/composables/useApi'

// Todo:: fix type: any
function globalActions(store: any) {
  return {
    merge(this: typeof store, resource: Record<string, any>) {
      const newState = JSON.parse(JSON.stringify(this.items))
      for (const r in resource) {
        const oldObj = this.items[r] || Object.create({})
        newState[r] = Object.assign({}, oldObj, resource[r])
      }
      this.items = newState
    },
    async index(this: typeof store) {
      const response = await useApi().sendRequest(this.storeName)

      if (response.data)
        this.items = response.data
    },
    async show(this: typeof store, id: number | string) {
      const response = await useApi().sendRequest(`${this.storeName}/${id}`)

      if (response.data) {
        const index = Object.values(this.items).findIndex((item: any) => item.id === response.data.id)
        if (index !== -1)
          this.items[index] = { ...response.data }
        else
          this.merge(store, { ...response.data })
      }
    },
    async create(this: typeof store, body: Record<string, any>) {
      const response = await useApi().sendRequest(this.storeName, {
        method: 'post',
        body,
      })

      if (response.data) {
        this.merge(store, { ...response.data })
        useToastMessage(200, useI18n().t('success.resourceCreated')).showSuccess()
      }
    },
    async update(this: typeof store, id: number | string, body: Record<string, any>) {
      const response = await useApi().sendRequest(this.storeName, {
        method: 'put',
        body,
      })

      if (response.data) {
        const index = this.items.findIndex((item: any) => item.id === response.data.id)
        if (index !== -1) {
          this.items[index] = { ...response.data }
          useToastMessage(200, useI18n().t('success.resourceUpdated')).showSuccess()
        }
      }
    },
    async delete(this: typeof store, id: number | string) {
      const response = await useApi().sendRequest(`${this.storeName}/${id}`, {
        method: 'delete',
      })

      if (response.data) {
        const index = Object.values(this.items).findIndex((item: any) => item.id === response.data.id)
        if (index !== -1) {
          delete this.items[id]
          useToastMessage(200, useI18n().t('success.resourceDeleted')).showSuccess()
        }
      }
    },
  }
}

export default globalActions
