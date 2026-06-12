import { authClient } from "~/lib/auth/index.client";

export async function getActiveOrganization() {
  // By default, if you don't pass any properties, it will use the active organization.
  const activeOrganization =
    await authClient.organization.getFullOrganization();
  return activeOrganization;
}
