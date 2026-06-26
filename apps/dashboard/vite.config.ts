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
      "@better-vitals/ui",
      "@better-vitals/shared",
      "react-aria-components",
      "react-aria",
      "react-stately",
      "@react-aria",
      "@react-stately",
      "@react-types",
      "@radix-ui/react-avatar",
    ],
  },
});
