import type { Getters, State, StateItem } from '~/types/store/defaults'

const globalGetters: Getters = {
  find(state: State) {
    return function (itemToFind) {
      const stateItem = Object.values(state.items)
        .find((item: StateItem) => {
          if (typeof itemToFind === 'object')
            return item.id === itemToFind.id
          else
            return item.id === Number(itemToFind)
        }) as StateItem | undefined

      if (stateItem)
        return populateRelations(state.model.relationships, stateItem)

      return stateItem
    }
  },
  getItems(state: State) {
    return (Object.values(state.items) as StateItem[])
      .map((item) => {
        return this.find(state)(item.id) as StateItem
      })
      .filter(item => !!item)
  },
  getPluralTitle: state => state.model.title.plural,
  getSingularTitle: state => state.model.title.singular,
  getTableColumns: state => state.model.table.columns.sort((a, b) => a.order - b.order),
  getPagination: state => state.model.pagination,
  getFormFields: state => state.model.form.fields.sort((a, b) => a.order - b.order),
}

export default globalGetters
