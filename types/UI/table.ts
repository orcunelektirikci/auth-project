export interface TableColumn {
  id: number
  order: number
  key: string
  label: string
  sortable?: boolean
  relation?: string
  isComponent?: boolean
  component?: string
}
