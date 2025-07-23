import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
