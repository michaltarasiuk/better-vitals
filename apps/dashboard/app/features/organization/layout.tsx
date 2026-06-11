import { isDefined } from "@lite-app/shared/is-defined";

import { sessionContext } from "~/lib/auth/context.server";
import { requireAuthenticated } from "~/lib/auth/middleware.server";

import type { Route } from "./+types/layout";

export { OrganizationLayout as default } from "./layout.client";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export function loader({ context }: Route.LoaderArgs) {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Session missing after requireAuthenticated middleware");
  }
  return {
    user: session.user,
  };
}
