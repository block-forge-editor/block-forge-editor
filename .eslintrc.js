module.exports = {
  extends: ["./local.eslint.config.js"],
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
};
