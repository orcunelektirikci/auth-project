import type { Item, State } from '~/types/store/defaults'

const globalGetters = {
  getItems: (state: State) => {
    return state.items
  },
  find: (state: State) => {
    return (id: number | string): Item | undefined => {
      return Object.values(state.items).find(item => item.id === +id)
    }
  },
}

export default globalGetters
