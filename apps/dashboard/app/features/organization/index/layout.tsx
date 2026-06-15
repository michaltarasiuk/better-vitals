import { isDefined } from "@lite-app/shared/is-defined";

import { requireAuthenticated } from "~/lib/auth/guards.server";
import { sessionContext } from "~/lib/auth/session.server";

import type { Route } from "./+types/layout";

export { SidebarLayout as default } from "./sidebar-layout";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export function loader({ context }: Route.LoaderArgs) {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Missing session");
  }
  return {
    user: session.user,
  };
}
