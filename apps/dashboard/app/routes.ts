import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [
    route("signup", "routes/auth/signup.tsx"),
    route("signin", "routes/auth/signin.tsx"),
    route("request-password-reset", "routes/auth/request-password-reset.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
  ]),
  layout("routes/organization/layout.tsx", [
    route("organization/create", "routes/organization/create.tsx"),
  ]),
  layout("routes/demo/layout.tsx", [
    route("demo/table", "routes/demo/table.tsx"),
  ]),
  route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig;
