import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

interface FormElement {
  id: string
  component: string
  field: string
  label: string
  type: string
  config: any
  rules: string[]
}

export default function useValidationSchema(formElements: FormElement[]) {
  const schema = ref(
    z.object(
      formElements.reduce((acc: Record<string, ZodTypeAny>, element) => {
        const validator = z.string() // Use string validator for all elements

        element.rules.forEach((rule) => {
          if (rule === 'required') {
            validator.nonempty({ message: 'This field is required' })
          }
          else if (rule === 'email') {
            validator.email({ message: 'Invalid email address' })
          }
          else if (rule === 'url') {
            validator.url({ message: 'Invalid URL' })
          }
          else if (rule === 'alpha') {
            validator.regex(/^[A-Za-z]+$/, { message: 'This field must contain only alphabetic characters' })
          }
          else if (rule === 'alphanumeric') {
            validator.regex(/^[A-Za-z0-9]+$/, { message: 'This field must contain only alphanumeric characters' })
          }
          else if (rule === 'uppercase') {
            validator.regex(/^[A-Z]+$/, { message: 'This field must contain only uppercase letters' })
          }
          else if (rule === 'lowercase') {
            validator.regex(/^[a-z]+$/, { message: 'This field must contain only lowercase letters' })
          }
          else if (rule.startsWith('maxLength')) {
            const maxLength = Number.parseInt(rule.split(':')[1])
            validator.max(maxLength, { message: `This field must be at most ${maxLength} characters long` })
          }
          else if (rule.startsWith('minLength')) {
            const minLength = Number.parseInt(rule.split(':')[1])
            validator.min(minLength, { message: `This field must be at least ${minLength} characters long` })
          }
        })

        acc[element.field] = validator
        return acc
      }, {}),
    ),
  )

  return { schema }
}
