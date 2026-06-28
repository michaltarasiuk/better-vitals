import { isDefined } from "@better-vitals/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session";
import { getFullOrganization, listOrganizations } from "~/lib/organization";

export async function getAuthenticatedRedirectHref() {
  const [admin, activeOrganization, organizations] = await Promise.all([
    isAdmin(),
    getFullOrganization(),
    listOrganizations(),
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
