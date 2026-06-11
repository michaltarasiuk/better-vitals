import { requireAdminWithoutOrganization } from "~/lib/organization/middleware.server";

import type { Route } from "./+types/route";

export { clientAction, OrganizationCreate as default } from "./route.client";

export const middleware: Route.MiddlewareFunction[] = [
  requireAdminWithoutOrganization,
];
