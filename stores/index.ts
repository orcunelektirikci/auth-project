import type { StoreDefinition } from 'pinia'
import { useBlogsStore } from '~/stores/useBlogsStore'
import { useUsersStore } from '~/stores/useUsersStore'

export const availableStoreNames = ['blogs', 'users']

export const availableStores = {
  blogs: useBlogsStore,
  users: useUsersStore,
} as Record<typeof availableStoreNames[number], () => ReturnType<StoreDefinition>>
