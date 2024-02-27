export default {
  table: {
    columns: [
      {
        id: 1,
        key: 'id',
        label: 'ID',
        sortable: true,
      },
      {
        id: 2,
        key: 'title',
        label: 'Title',
        sortable: true,
      },
      {
        id: 3,
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
