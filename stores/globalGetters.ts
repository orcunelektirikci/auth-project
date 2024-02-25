const globalGetters = {
  getItems: (state: any) => {
    return state.items
  },
  // Todo:: this is a bit funky
  find: (state: any) => {
    return (id: number | string): any => {
      return Object.values(state.items).find((item: any) => item.id === +id)
    }
  },
}

export default globalGetters
