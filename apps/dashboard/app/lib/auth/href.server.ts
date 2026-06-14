import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session.server";
import { hasUsers } from "~/lib/db/user.server";
import { getActiveOrganization } from "~/lib/organization/index.server";

export async function getAuthenticatedRedirectHref(request: Request) {
  const [admin, organization] = await Promise.all([
    isAdmin(request),
    getActiveOrganization(request),
  ]);
  if (!isDefined(organization)) {
    if (!admin) {
      return "/no-organization";
    }
    return href("/organization/create");
  }
  return href(`/:slug`, { slug: organization.slug });
}

export async function getUnauthenticatedRedirectHref() {
  if (await hasUsers()) {
    return href("/signin");
  }
  return href("/signup");
}
