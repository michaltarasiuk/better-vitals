import { isDefined } from "@better-vitals/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session.server";
import { hasUsers } from "~/lib/db/user.server";
import {
  getFullOrganization,
  listOrganizations,
} from "~/lib/organization/index.server";

export async function getAuthenticatedRedirectHref(request: Request) {
  const [admin, activeOrganization, organizations] = await Promise.all([
    isAdmin(request),
    getFullOrganization({
      headers: request.headers,
    }),
    listOrganizations({
      headers: request.headers,
    }),
  ]);
  if (admin instanceof Error) {
    return admin;
  }
  if (activeOrganization instanceof Error) {
    return activeOrganization;
  }
  if (organizations instanceof Error) {
    return organizations;
  }
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
