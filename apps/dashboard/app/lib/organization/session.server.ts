import { isDefined } from "@lite-app/shared/is-defined";

import { auth } from "~/lib/auth/index.server";
import { getServerSession } from "~/lib/auth/session.server";

export async function getUserOrganizations(request: Request) {
  const session = await getServerSession(request);
  if (!isDefined(session)) {
    return [];
  }
  const organizations = await auth.api.listOrganizations({
    headers: request.headers,
  });
  return organizations;
}

export async function hasUserOrganizations(request: Request) {
  const organizations = await getUserOrganizations(request);
  return organizations.length > 0;
}
