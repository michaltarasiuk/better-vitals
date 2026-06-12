import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { auth } from "~/lib/auth/index.server";
import { userExists } from "~/lib/db/user.server";
import { getActiveOrganization } from "~/lib/organization/index.server";

export async function getAuthenticatedRedirectHref(request: Request) {
  const activeOrganization = await getActiveOrganization(request);

  let slug = activeOrganization?.slug;
  if (!isDefined(slug)) {
    const [first] = await auth.api.listOrganizations({
      headers: request.headers,
    });
    ({ slug } = first);
  }

  return isDefined(slug)
    ? href(`/:slug`, { slug })
    : href("/organization/create");
}

export async function getUnauthenticatedRedirectHref() {
  return (await userExists()) ? href("/signin") : href("/signup");
}
