import { isDefined } from "@lite-app/shared/is-defined";
import { redirect } from "react-router";

import { getUnauthenticatedRedirectHref } from "~/lib/auth/index.server";
import { getServerSession } from "~/lib/auth/session.server";

import type { Route } from "./+types/layout";

export { OrganizationLayout as default } from "./layout.client";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getServerSession(request);
  if (!isDefined(session)) {
    throw redirect(await getUnauthenticatedRedirectHref());
  }
  return {
    user: session.user,
  };
}
