import { populateRelations } from './helpers'
import type { State, StateItem } from '~/types/store/defaults'

const globalGetters = {
  getItems: (state: State) => Object.values(state.items) as StateItem[],
  find: (state: State) => {
    return (id: number | string): StateItem | undefined => {
      const stateItem = Object.values(state.items).find((item: StateItem) => item.id === +id) as StateItem | undefined
      if (stateItem)
        return populateRelations(state.model.relationships, stateItem)

      return stateItem
    }
  },
  getPluralTitle: (state: State) => state.model.title.plural,
  getSingularTitle: (state: State) => state.model.title.singular,
  getTableColumns: (state: State) => state.model.table.columns,
  getPagination: (state: State) => state.model.pagination,
}

export default globalGetters
