import { isDefined } from "@lite-app/shared/is-defined";
import { href, redirect, type MiddlewareFunction } from "react-router";

import { sessionContext } from "~/lib/auth/context.server";
import { ADMIN_ROLE } from "~/lib/auth/session.client";

import { getUserOrganizations } from "./session.server";

export const requireAdminWithoutOrganization: MiddlewareFunction<
  Response
> = async ({ request, context }) => {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Session missing after requireAuthenticated middleware");
  }
  const organizations = await getUserOrganizations(request);
  const admin = session.user.role === ADMIN_ROLE;
  if (!admin || organizations.length > 0) {
    throw redirect(href("/"));
  }
};
