import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      import: importPlugin,
    },
    rules: {
      ...Object.fromEntries(
        Object.entries(nextPlugin.configs.recommended.rules).map(([key, value]) =>
          typeof value === "string" ? [key, [value]] : [key, value]
        )
      ),
      ...Object.fromEntries(
        Object.entries(nextPlugin.configs["core-web-vitals"].rules).map(([key, value]) =>
          typeof value === "string" ? [key, [value]] : [key, value]
        )
      ),
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": ["error"],
      "@typescript-eslint/prefer-nullish-coalescing": ["off"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-unsafe-member-access": ["off"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": ["error"],
      "import/no-duplicates": ["error"],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "build/",
      "out/",
      ".turbo/",
      "*.config.{js,mjs,cjs}",
      "public/",
      "coverage/",
    ],
  }
);
