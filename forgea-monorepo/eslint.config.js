import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      ".turbo/**",
      "coverage/**",
    ],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        {
          type: "app",
          pattern: "apps/*",
        },
        {
          type: "package",
          pattern: "packages/*",
        },
        {
          type: "service",
          pattern: "services/*",
        },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["package"],
            },
            {
              from: "package",
              allow: ["package"],
            },
            {
              from: "service",
              allow: ["package"],
            },
          ],
        },
      ],
    },
    linterOptions: {
      noInlineConfig: false,
    },
  },
];
