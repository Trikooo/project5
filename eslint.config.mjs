import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",  // Add process as a global variable
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",  // Ensure process is available globally
      },
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
