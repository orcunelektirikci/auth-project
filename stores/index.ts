import { useBlogsStore } from '~/stores/useBlogsStore'
import { useUsersStore } from '~/stores/useUsersStore'

const storeMap = {
  blogs: useBlogsStore,
  users: useUsersStore,
}

export default storeMap
