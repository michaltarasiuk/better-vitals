import { isDefined } from "@lite-app/shared/is-defined";

import { auth } from "~/lib/auth/index.server";

import type { Route } from "./+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  const organization = await auth.api.getFullOrganization({
    headers: request.headers,
    query: {
      organizationSlug: params.slug,
    },
  });
  if (!isDefined(organization)) {
    throw new Response("Not Found", { status: 404 });
  }

  await auth.api.setActiveOrganization({
    body: {
      organizationId: organization.id,
    },
    headers: request.headers,
  });
}

export default function Organization() {
  return null;
}
