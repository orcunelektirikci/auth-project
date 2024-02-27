import type { Item, State } from '~/types/store/defaults'

const globalGetters = {
  getItems: (state: State) => Object.values(state.items),
  find: (state: State) => {
    return (id: number | string): Item | undefined => {
      return Object.values(state.items).find(item => item.id === +id)
    }
  },
  getPluralTitle: (state: State) => state.title.plural,
  getSingularTitle: (state: State) => state.title.singular,
  getTableColumns: (state: State) => state.model.table.columns,
  getPagination: (state: State) => state.pagination,
}

export default globalGetters
