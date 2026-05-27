import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [tailwindcss(), reactRouterRSC(), rsc(), devtoolsJson()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: [
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
