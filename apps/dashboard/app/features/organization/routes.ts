import { type RouteConfig, relative } from "@react-router/dev/routes";

const { layout, route } = relative(import.meta.dirname);

export default [
  layout("./create/layout.tsx", [
    route("organization/create", "./create/route.tsx"),
  ]),
  layout("./layout.tsx", [route("/:slug", "./index/route.tsx")]),
] satisfies RouteConfig;
