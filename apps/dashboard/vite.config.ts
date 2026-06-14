import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { denyImports } from "vite-env-only";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    tailwindcss(),
    denyImports({
      client: { files: ["**/.server/*", "**/*.server.*"] },
    }),
    reactRouter(),
    devtoolsJson(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: [
      "@lite-app/ui",
      "@lite-app/shared",
      "@radix-ui/react-avatar",
      "@react-aria",
      "@react-stately",
      "@react-types",
      "react-aria",
      "react-aria-components",
      "react-stately",
    ],
  },
});
