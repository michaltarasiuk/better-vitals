import type { RouteConfig } from "@react-router/dev/routes";

import apiRoutes from "./features/api/routes";
import authRoutes from "./features/auth/routes";
import organizationRoutes from "./features/organization/routes";

export default [
  ...authRoutes,
  ...organizationRoutes,
  ...apiRoutes,
] satisfies RouteConfig;
