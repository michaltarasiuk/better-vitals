import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session";
import { getActiveOrganization } from "~/lib/organization/index";

export async function getAuthenticatedRedirectHref() {
  const [admin, activeOrganization] = await Promise.all([
    isAdmin(),
    getActiveOrganization(),
  ]);
  if (!isDefined(activeOrganization.data)) {
    if (!admin) {
      return href("/organization/select");
    }
    return href("/organization/create");
  }
  return href(`/:slug`, {
    slug: activeOrganization.data.slug,
  });
}
