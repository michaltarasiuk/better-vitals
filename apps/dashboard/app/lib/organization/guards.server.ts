import { isDefined } from "@lite-app/shared/is-defined";
import { redirectDocument, type MiddlewareFunction } from "react-router";

import { ADMIN_ROLE } from "~/lib/auth/consts";
import { getAuthenticatedRedirectHref } from "~/lib/auth/href.server";
import { auth } from "~/lib/auth/index.server";
import { sessionContext } from "~/lib/auth/session.server";

export const requireAdminWithoutOrganization: MiddlewareFunction<
  Response
> = async ({ request, context }) => {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Session missing after requireAuthenticated middleware");
  }
  const organizations = await auth.api.listOrganizations({
    headers: request.headers,
  });
  const admin = session.user.role === ADMIN_ROLE;
  if (!admin || organizations.length > 0) {
    const redirectHref = await getAuthenticatedRedirectHref(request);
    throw redirectDocument(redirectHref);
  }
};
