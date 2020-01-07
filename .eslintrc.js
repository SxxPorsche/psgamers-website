module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'plugin:@typescript-eslint/recommended',
    "react-app",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack/webpack.dev.js",
      }
    },
  }
};
