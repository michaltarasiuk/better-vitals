import { isDefined } from "@lite-app/shared/is-defined";

import { auth } from "./index.server";
import { ADMIN_ROLE } from "./session.client";

export function getServerSession(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}

export async function isLoggedIn(request: Request) {
  const session = await getServerSession(request);
  return isDefined(session);
}

export async function isAdmin(request: Request) {
  const session = await getServerSession(request);
  if (!isDefined(session)) {
    return false;
  }
  return session.user.role === ADMIN_ROLE;
}
