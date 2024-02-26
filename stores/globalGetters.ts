import type { Item, State } from '~/types/store/defaults'

const globalGetters = {
  getItems: (state: State) => state.items,
  find: (state: State) => {
    return (id: number | string): Item | undefined => {
      return Object.values(state.items).find(item => item.id === +id)
    }
  },
  getPluralTitle: (state: State) => state.title.plural,
  getSingularTitle: (state: State) => state.title.singular,
}

export default globalGetters
