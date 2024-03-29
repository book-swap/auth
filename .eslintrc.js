module.exports = {
  plugins: ["prettier"],
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["airbnb-base",  "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-console": "off",
    "prettier/prettier": "error"
  }
};
