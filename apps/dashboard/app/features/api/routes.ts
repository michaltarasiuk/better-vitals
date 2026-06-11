import { type RouteConfig, relative } from "@react-router/dev/routes";

const { route } = relative(import.meta.dirname);

export default [route("api/auth/*", "./auth.$/route.ts")] satisfies RouteConfig;
