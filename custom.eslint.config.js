module.exports = {
  root: true,
  plugins: ["react", "react-hooks", "perfectionist"],
  settings: {
    react: { version: "detect" },
  },
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "2022",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
      ],
      rules: {
        "no-undef": "off",
        "valid-typeof": "off",
        "no-unused-vars": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "perfectionist/sort-maps": "off",
        "perfectionist/sort-enums": "off",
        "perfectionist/sort-objects": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-dynamic-delete": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-enum-comparison": "warn",
        "@typescript-eslint/no-redundant-type-constituents": "warn",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      },
    },
  ],
  rules: {
    "perfectionist/sort-objects": [
      "warn",
      {
        path: "asc",
      },
    ],
    "perfectionist/sort-maps": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-enums": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-exports": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-jsx-props": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-union-types": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-object-types": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-named-imports": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-named-exports": [
      "warn",
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-array-includes": [
      "warn",
      {
        order: "asc",
        type: "line-length",
        "spread-last": true,
      },
    ],
    "perfectionist/sort-imports": [
      "warn",
      {
        groups: [
          "framework",
          ["builtin", "external"],
          ["parent", "sibling", "siblings"],
          "widgets",
          "features",
          "entities",
          "public",
          ["styles", "style"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          type: {},
          value: {
            public: ["@/public/**"],
            styles: ["@/editor/lib/styles/**"],
            framework: ["react", "react-*"],
          },
        },
      },
    ],
  },
};
