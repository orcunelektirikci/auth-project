import type { StrKeyObj } from './objects'

export interface FormLayoutRules {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export interface FormField {
  id: number | string
  order: number
  component: string
  type: string
  field: string
  label: string
  defaultValue: string
  rules: string[]
  layout: FormLayoutRules
  class: string
  config?: StrKeyObj<any>
}
