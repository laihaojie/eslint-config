import jie from './src'

export default jie(
  {
    vue: true,
    // react: true,
    typescript: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  // {
  //   files: ['src/configs/*.ts'],
  //   plugins: {
  //     'style-migrate': styleMigrate,
  //   },
  //   rules: {
  //     'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
  //   },
  // },
)
