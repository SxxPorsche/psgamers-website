module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'plugin:@typescript-eslint/recommended',
    "react-app"
  ],
  plugins: [
    "@typescript-eslint",
    "react"
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack/webpack.dev.js",
      }
    },
  }
};
