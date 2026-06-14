import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session";
import { getActiveOrganization } from "~/lib/organization/index";

export async function getAuthenticatedRedirectHref() {
  const [admin, organization] = await Promise.all([
    isAdmin(),
    getActiveOrganization(),
  ]);
  if (!isDefined(organization.data)) {
    if (!admin) {
      return "/no-organization";
    }
    return href("/organization/create");
  }
  return href(`/:slug`, { slug: organization.data.slug });
}
