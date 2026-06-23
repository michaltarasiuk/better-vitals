import { type RouteConfig, relative } from "@react-router/dev/routes";

const { layout, route } = relative(import.meta.dirname);

export default [
  layout("./create/layout.tsx", [
    route("organization/create", "./create/route.tsx"),
  ]),
  route("organization/select", "./select/route.tsx"),
  layout("./index/layout.tsx", [
    route("/organization/:slug", "./index/route.tsx"),
    route("/organization/:slug/invite", "./invite/route.tsx"),
  ]),
] satisfies RouteConfig;
