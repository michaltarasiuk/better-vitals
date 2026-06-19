import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  sortPackageJson: false,
  sortTailwindcss: {
    functions: ["cn", "clsx", "cva", "tv"],
    stylesheet: "./packages/ui/src/styles/index.css",
  },
});
