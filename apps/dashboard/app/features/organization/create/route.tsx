import { requireAuthenticated } from "~/lib/auth/guards.server";
import { requireAdminWithoutOrganization } from "~/lib/organization/guards.server";

import type { Route } from "./+types/route";

export { clientAction, OrganizationCreate as default } from "./create";

export const middleware: Route.MiddlewareFunction[] = [
  requireAuthenticated,
  requireAdminWithoutOrganization,
];
