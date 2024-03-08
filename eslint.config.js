import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    formatters: {
      html: true,
      markdown: 'prettier',
    },
  },
  {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
      'node/prefer-global/process': ['warn', 'always'],
      'semi': ['error', 'never'],
      'no-extra-semi': 'error',
      'quotes': ['error', 'single'],
    },
  },
)
