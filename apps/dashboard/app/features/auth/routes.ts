import { type RouteConfig, relative } from "@react-router/dev/routes";

const { layout, route } = relative(import.meta.dirname);

export default [
  layout("./layout.tsx", [
    route("signup", "./signup/route.tsx"),
    route("signin", "./signin/route.tsx"),
    route("request-password-reset", "./request-password-reset/route.tsx"),
    route("reset-password", "./reset-password/route.tsx"),
  ]),
] satisfies RouteConfig;
