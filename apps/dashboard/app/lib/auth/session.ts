import { isDefined } from "@better-vitals/shared/is-defined";

import { getSession } from "~/lib/auth";
import { ADMIN_ROLE } from "~/lib/auth/roles";

export async function isAdmin() {
  const session = await getSession();
  if (session instanceof Error) {
    return session;
  }
  if (!isDefined(session)) {
    return false;
  }
  return session.user.role === ADMIN_ROLE;
}
