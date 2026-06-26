import { isDefined } from "@better-vitals/shared/is-defined";

import {
  getFullOrganization,
  setActiveOrganization,
} from "~/lib/organization/index.server";

import type { Route } from "./+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  const organization = await getFullOrganization({
    query: {
      organizationSlug: params.slug,
    },
    headers: request.headers,
  });
  if (organization instanceof Error) {
    console.error(organization);
    throw organization;
  }
  if (!isDefined(organization)) {
    throw new Response("Not Found", { status: 404 });
  }
  const activeOrganization = await setActiveOrganization({
    body: {
      organizationId: organization.id,
    },
    headers: request.headers,
  });
  if (activeOrganization instanceof Error) {
    console.error(activeOrganization);
    throw activeOrganization;
  }
}

export default function Organization() {
  return null;
}
