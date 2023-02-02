module.exports = {
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        semi: false,
        'no-new-object': 'error'
      }
    ]
  },
  env: {
    browser: true,
    amd: true,
    node: true
  }
}
