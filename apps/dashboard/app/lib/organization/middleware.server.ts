import { href, redirect, type MiddlewareFunction } from "react-router";

import { getUnauthenticatedRedirectHref } from "~/lib/auth/index.server";
import { isAdmin, isLoggedIn } from "~/lib/auth/session.server";

import { getUserOrganizations } from "./session.server";

export const requireAdminWithoutOrganization: MiddlewareFunction<
  Response
> = async ({ request }) => {
  if (!(await isLoggedIn(request))) {
    throw redirect(await getUnauthenticatedRedirectHref());
  }
  const [admin, organizations] = await Promise.all([
    isAdmin(request),
    getUserOrganizations(request),
  ]);
  if (!admin || organizations.length > 0) {
    throw redirect(href("/"));
  }
};
