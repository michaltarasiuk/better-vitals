import { isDefined } from "@lite-app/shared/is-defined";
import { redirectDocument, type MiddlewareFunction } from "react-router";

import { getAuthenticatedRedirectHref } from "~/lib/auth/href.server";
import { ADMIN_ROLE } from "~/lib/auth/roles";
import { sessionContext } from "~/lib/auth/session.server";
import { listOrganizations } from "~/lib/organization/index.server";

export const requireAdminWithoutOrganization: MiddlewareFunction<
  Response
> = async ({ request, context }) => {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Missing session");
  }
  const organizations = await listOrganizations({
    headers: request.headers,
  });
  if (organizations instanceof Error) {
    console.error(organizations);
    throw organizations;
  }
  const admin = session.user.role === ADMIN_ROLE;
  if (!admin || organizations.length > 0) {
    const redirectHref = await getAuthenticatedRedirectHref(request);
    throw redirectDocument(redirectHref);
  }
};
