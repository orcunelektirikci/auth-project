import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
      'curly': 'off',
      'no-console': 'off',
      'antfu/top-level-function': 'off',
      'semi': ['error', 'never'],
      'no-extra-semi': 'error',
      'quotes': ['error', 'single'],
    },
  },
)
