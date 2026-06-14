import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { isAdmin } from "~/lib/auth/session.server";
import { hasUsers } from "~/lib/db/user.server";
import { getActiveOrganization } from "~/lib/organization/index.server";

export async function getAuthenticatedRedirectHref(request: Request) {
  const [admin, activeOrganization] = await Promise.all([
    isAdmin(request),
    getActiveOrganization(request),
  ]);
  if (!isDefined(activeOrganization)) {
    if (!admin) {
      return href("/organization/select");
    }
    return href("/organization/create");
  }
  return href(`/:slug`, {
    slug: activeOrganization.slug,
  });
}

export async function getUnauthenticatedRedirectHref() {
  if (await hasUsers()) {
    return href("/signin");
  }
  return href("/signup");
}
