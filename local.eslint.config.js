module.exports = {
  root: true,
  settings: {
    react: { version: "detect" },
  },
  plugins: ["react", "react-hooks", "effector", "perfectionist"],
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
    "plugin:effector/react",
    "plugin:effector/recommended",
    "plugin:storybook/recommended",
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
        "perfectionist/sort-maps": "off",
        "perfectionist/sort-enums": "off",
        "perfectionist/sort-objects": "off",
        "no-undef": "off",
        "valid-typeof": "off",
        "no-unused-vars": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
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
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "lodash",
                importNames: ["sample"],
                message:
                  "You probably want to use `sample` from `effector` instead?",
              },
            ],
          },
        ],
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
    "perfectionist/sort-objects": [
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
          "pages",
          "widgets",
          "features",
          "entities",
          "store",
          "shared",
          "public",
          ["styles", "style"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          type: {},
          value: {
            shared: "@/shared/**",
            widgets: "@/widgets/**",
            public: ["@/public/**"],
            entities: "@/entities/**",
            features: "@/features/**",
            styles: ["@/shared/lib/styles/**"],
            pages: ["@/app/**", "@/pagesLayer/**"],
            framework: ["react", "react-*", "next", "next/**"],
            store: [
              "@/shared/store",
              "@/shared/lib/store/**",
              "@/shared/lib/selectors",
            ],
          },
        },
      },
    ],
  },
};
