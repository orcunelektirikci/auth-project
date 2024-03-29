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
        component: 'text',
        type: 'text',
        field: 'title',
        label: 'Title',
        rules: [
          'string',
          'required',
          'string',
          'minLength:3',
        ],
        layout: {
          sm: 'full',
          md: '1/2',
          lg: '1/2',
          xl: '1/2',
        },
        class: '',
        config: {},
      },
      {
        id: 2,
        order: 2,
        component: 'autocomplete',
        type: 'autocomplete',
        field: 'author',
        label: 'Author',
        rules: [
          'string',
          'required',
        ],
        layout: {
          sm: 'full',
          md: '1/2',
          lg: '1/2',
          xl: '1/2',
        },
        class: '',
        config: {
          relatedResource: 'users',
          labelField: 'name',
          searchFields: ['name'],
          multiple: false,
        },
      },
      {
        id: 3,
        order: 3,
        component: 'textarea',
        type: 'text',
        field: 'body',
        label: 'body',
        rules: [
          'string',
          'required',
          'string',
          'minLength:3',
        ],
        layout: {
          sm: 'full',
          md: 'full',
          lg: 'full',
          xl: 'full',
        },
        class: '',
        config: {
          placeholder: 'Write your content here...',
        },
      },
    ],
  },
}
