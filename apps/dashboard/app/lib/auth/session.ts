import { isDefined } from "@lite-app/shared/is-defined";

import { getSession } from "~/lib/auth";
import { ADMIN_ROLE } from "~/lib/auth/roles";

export async function isAdmin() {
  const session = await getSession();
  if (!isDefined(session.data)) {
    return false;
  }
  return session.data.user.role === ADMIN_ROLE;
}
