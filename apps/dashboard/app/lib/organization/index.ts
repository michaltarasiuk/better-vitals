import { authClient } from "~/lib/auth";

export function getActiveOrganization() {
  return authClient.organization.getFullOrganization();
}
