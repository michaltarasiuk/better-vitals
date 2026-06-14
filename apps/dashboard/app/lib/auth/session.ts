import { isDefined } from "@lite-app/shared/is-defined";

import { authClient } from "~/lib/auth";
import { ADMIN_ROLE } from "~/lib/auth/consts";

export async function isAdmin() {
  const session = await authClient.getSession();
  if (!isDefined(session.data)) {
    return false;
  }
  return session.data.user.role === ADMIN_ROLE;
}
