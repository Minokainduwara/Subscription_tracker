import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node, // ✅ Node.js environment (includes process, module, etc.)
            },
        },
        plugins: {
            js,
        },
        extends: ["plugin:@eslint/js/recommended"],
        rules: {
            // your custom rules here (optional)
        },
    },
]);
