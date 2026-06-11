import { type RouteConfig, relative } from "@react-router/dev/routes";

const { index, layout, route } = relative(import.meta.dirname);

export default [
  layout("./create/layout.tsx", [
    route("organization/create", "./create/route.tsx"),
  ]),
  layout("./layout.tsx", [index("./index/route.tsx")]),
] satisfies RouteConfig;
