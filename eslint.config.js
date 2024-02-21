import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
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
