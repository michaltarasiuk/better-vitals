import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import { denyImports } from "vite-env-only";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    tailwindcss(),
    denyImports({
      client: { files: ["**/.server/*", "**/*.server.*"] },
    }),
    reactRouterRSC(),
    rsc(),
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
