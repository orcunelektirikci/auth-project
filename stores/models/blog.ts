import type { StateModel } from '~/types/store/defaults'

export default <StateModel> {
  storeName: 'blogs',
  title: {
    plural: 'blogs.title.plural',
    singular: 'blogs.title.singular',
  },
  pagination: {
    itemsPerPage: 15,
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
    itemsByPage: {},
  },
  relationships: [
    {
      key: 'author',
      store: 'users',
    },
  ],
  table: {
    columns: [
      {
        id: 1,
        order: 1,
        key: 'id',
        label: 'ID',
        sortable: true,
      },
      {
        id: 2,
        order: 2,
        key: 'title',
        label: 'Title',
        sortable: true,
      },
      {
        id: 3,
        order: 3,
        isComponent: true,
        component: 'columnsRelationValue',
        relation: 'author',
        key: 'name',
        label: 'Author',
        sortable: false,
      },
    ],
  },
  form: {
    fields: [
      {
        id: 1,
        order: 1,
        component: 'TextInput',
        type: 'text',
        field: 'title',
        label: 'Title',
        defaultValue: '',
        rules: [
          'required',
          'string',
          'min:3',
        ],
      },
      {
        id: 2,
        order: 2,
        component: 'TextareaInput',
        type: 'text',
        field: 'content',
        label: 'Content',
        defaultValue: '',
        rules: [
          'required',
          'string',
          'min:3',
        ],
      },
      {
        id: 3,
        order: 3,
        component: 'RelationAutocompleteInput',
        type: 'autocomplete',
        field: 'author',
        label: 'Author',
        defaultValue: '',
        rules: [
          'required',
        ],
      },
    ],
  },
}
