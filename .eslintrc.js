// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "warn",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    eqeqeq: ["warn", "always"],
    curly: ["warn", "all"],
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-script-url": "error",
    "no-iterator": "warn",
    "no-labels": [
      "warn",
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    "no-lone-blocks": "warn",
    "no-multi-str": "warn",
    "no-new-func": "warn",
    "no-new-wrappers": "warn",
    "no-throw-literal": "warn",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "react/no-unescaped-entities": "warn",
  },
};
