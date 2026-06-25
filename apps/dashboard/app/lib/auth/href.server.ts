import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { auth } from "~/lib/auth/index.server";
import { isAdmin } from "~/lib/auth/session.server";
import { hasUsers } from "~/lib/db/user.server";

export async function getAuthenticatedRedirectHref(request: Request) {
  const [admin, activeOrganization, organizations] = await Promise.all([
    isAdmin(request),
    auth.api.getFullOrganization({
      headers: request.headers,
    }),
    auth.api.listOrganizations({
      headers: request.headers,
    }),
  ]);
  if (!isDefined(activeOrganization)) {
    if (!admin || organizations.length > 0) {
      return href("/organization/list");
    }
    return href("/organization/create");
  }
  return href(`/organization/:slug`, {
    slug: activeOrganization.slug,
  });
}

export async function getUnauthenticatedRedirectHref() {
  const hasAnyUsers = await hasUsers();
  if (hasAnyUsers instanceof Error) {
    return hasAnyUsers;
  }
  return hasAnyUsers ? href("/signin") : href("/signup");
}
