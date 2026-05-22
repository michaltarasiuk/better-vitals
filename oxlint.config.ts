import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react],
  rules: {
    "func-style": "off",
    // Functions are hoisted
    "no-use-before-define": "off",
    "typescript/no-empty-interface": "off",
    "typescript/no-empty-object-type": "off",
  },
});
