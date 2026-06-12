import { isDefined } from "@lite-app/shared/is-defined";
import { href } from "react-router";

import { authClient } from "~/lib/auth";
import { getActiveOrganization } from "~/lib/organization/index";

export async function getAuthenticatedRedirectHref() {
  const activeOrganization = await getActiveOrganization();

  let slug = activeOrganization.data?.slug;
  if (!isDefined(slug)) {
    const list = await authClient.organization.list();
    const [first] = list.data ?? [];
    ({ slug } = first);
  }

  return isDefined(slug)
    ? href(`/:slug`, { slug })
    : href("/organization/create");
}
