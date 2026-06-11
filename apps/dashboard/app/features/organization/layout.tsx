import { isDefined } from "@lite-app/shared/is-defined";

import { requireAuthenticated } from "~/lib/auth/middleware.server";
import { getServerSession } from "~/lib/auth/session.server";

import type { Route } from "./+types/layout";

export { OrganizationLayout as default } from "./layout.client";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getServerSession(request);
  if (!isDefined(session)) {
    throw new Error("Session missing after requireAuthenticated middleware");
  }
  return {
    user: session.user,
  };
}
