import { useBlogsStore } from '~/stores/useBlogsStore'
import { useUsersStore } from '~/stores/useUsersStore'

export default {
  blogs: useBlogsStore,
  users: useUsersStore,
}
