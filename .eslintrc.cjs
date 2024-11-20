module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended', // Добавляем плагин для импортов
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import'], // Добавляем плагин import
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Правила для импортов:

    'import/no-unresolved': 'error', // Подсвечивает неразрешенные импорты красным
    'import/named': 'error', // Проверяет корректность именованных импортов
    'import/namespace': 'error', // Проверяет корректность импортов пространств имен
    'import/default': 'error', // Проверяет корректность импортов по умолчанию
    'import/export': 'error', // Проверяет корректность экспортов
    'import/no-named-as-default': 'error', // Запрещает использовать именованные импорты как импорты по умолчанию
    'import/no-named-as-default-member': 'error', // Запрещает использовать именованные импорты как члены импортов по умолчанию
    'import/no-deprecated': 'warn', // Показывает предупреждение при использовании устаревших импортов
    'import/no-extraneous-dependencies': 'error', // Запрещает импортировать модули, не объявленные в зависимостях проекта
    'import/no-mutable-exports': 'error', // Запрещает изменять экспортированные значения
    'import/no-self-import': 'error', // Запрещает импортировать модуль сам в себя
    'import/no-cycle': 'error', // Запрещает циклические зависимости между модулями
    'import/no-useless-path-segments': 'error', // Запрещает ненужные сегменты пути в импортах
    'import/no-relative-parent-imports': 'error', // Запрещает использовать относительные пути для импорта из родительских директорий
  },
}