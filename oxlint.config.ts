import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react],
  overrides: [
    {
      files: ["packages/ui/src/components/**/index.ts"],
      rules: {
        // Ultracite discourages barrel files, but `@lite-app/ui/components/*` exports
        // require an index.ts entry point per component folder.
        "oxc/no-barrel-file": "off",
      },
    },
  ],
  rules: {
    // Prefer function declarations in this codebase, but func-style cannot enforce
    // "declarations except callbacks" — allowArrowFunctions exempts all arrows.
    "func-style": "off",
    // Ultracite prefers top-level `import type`, but that conflicts with merged
    // imports once duplicate type/value imports are disallowed below.
    "import/consistent-type-specifier-style": "off",
    // Require one import per module, e.g. `import { foo, type Bar } from "mod"`.
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: false }],
    // Functions are hoisted
    "no-use-before-define": "off",
    // Use inline `type` specifiers when types and values come from the same module.
    "typescript/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports" },
    ],
    // Allow marker interfaces like `interface FormProps extends RACFormProps {}`.
    "typescript/no-empty-interface": "off",
    "typescript/no-empty-object-type": "off",
  },
});
