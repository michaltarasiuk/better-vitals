import { type RouteConfig, index } from "@react-router/dev/routes";

import apiRoutes from "./features/api/routes";
import authRoutes from "./features/auth/routes";
import organizationRoutes from "./features/organization/routes";

export default [
  index("./features/index/route.tsx"),
  ...authRoutes,
  ...organizationRoutes,
  ...apiRoutes,
] satisfies RouteConfig;
