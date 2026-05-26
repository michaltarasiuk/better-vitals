import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [
    route("signup", "routes/auth/signup.tsx"),
    route("signin", "routes/auth/signin.tsx"),
    route("request-password-reset", "routes/auth/request-password-reset.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
  ]),
  route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig;
