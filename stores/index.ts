import type { StoreDefinition } from 'pinia'
import { useBlogsStore } from '~/stores/useBlogsStore'
import { useUsersStore } from '~/stores/useUsersStore'

const storeMap = {
  blogs: useBlogsStore,
  users: useUsersStore,
} as Record<string, () => ReturnType<StoreDefinition>>

export default storeMap
