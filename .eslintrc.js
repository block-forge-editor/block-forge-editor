module.exports = {
  extends: ["./custom.eslint.config.js"],
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
};
