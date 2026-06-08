import { requireAdminWithoutOrganization } from "~/lib/organization/middleware.server";

import type { Route } from "./+types/index";

export { clientAction, OrganizationCreate as default } from "./index.client";

export const middleware: Route.MiddlewareFunction[] = [
  requireAdminWithoutOrganization,
];
