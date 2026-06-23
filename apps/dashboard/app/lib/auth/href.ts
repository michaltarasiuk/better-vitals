import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { organization } from "~/lib/auth";
import { isAdmin } from "~/lib/auth/session";

export async function getAuthenticatedRedirectHref() {
  const [admin, activeOrganization, organizations] = await Promise.all([
    isAdmin(),
    organization.getFullOrganization(),
    organization.list(),
  ]);
  if (!isDefined(activeOrganization.data)) {
    if (!admin || (organizations.data ?? []).length > 0) {
      return href("/organization/list");
    }
    return href("/organization/create");
  }
  return href(`/organization/:slug`, {
    slug: activeOrganization.data.slug,
  });
}
