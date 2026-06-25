import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session";
import { getFullOrganization, listOrganizations } from "~/lib/organization";

export async function getAuthenticatedRedirectHref() {
  const [admin, activeOrganization, organizations] = await Promise.all([
    isAdmin(),
    getFullOrganization(),
    listOrganizations(),
  ]);
  if (activeOrganization instanceof Error) {
    console.error(activeOrganization);
    throw activeOrganization;
  }
  if (organizations instanceof Error) {
    console.error(organizations);
    throw organizations;
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
