import { isDefined } from "@better-vitals/shared/is-defined";
import { createContext } from "react-router";

import { SessionError } from "~/lib/auth/error";
import { ADMIN_ROLE } from "~/lib/auth/roles";

import { auth } from "./index.server";

export type ServerSession = typeof auth.$Infer.Session;

export const sessionContext = createContext<ServerSession>();

export function getSession(...params: Parameters<typeof auth.api.getSession>) {
  return auth.api.getSession(...params).catch(
    (error) =>
      new SessionError({
        operation: "get session",
        cause: error,
      })
  );
}

export async function isLoggedIn(request: Request) {
  const session = await getSession({
    headers: request.headers,
  });
  if (session instanceof Error) {
    return session;
  }
  return isDefined(session);
}

export async function isAdmin(request: Request) {
  const session = await getSession({
    headers: request.headers,
  });
  if (session instanceof Error) {
    return session;
  }
  if (!isDefined(session)) {
    return false;
  }
  return session.user.role === ADMIN_ROLE;
}
