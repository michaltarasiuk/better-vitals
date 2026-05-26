import { href, redirect, type LoaderFunctionArgs } from "react-router";

import { isAdmin, isLoggedIn } from "~/lib/auth/session.server";
import { getUserOrganizations } from "~/lib/organization/session.server";

export { clientAction, CreateOrganization as default } from "./create.client";

export async function loader({ request }: LoaderFunctionArgs) {
  const [loggedIn, admin, organizations] = await Promise.all([
    isLoggedIn(request),
    isAdmin(request),
    getUserOrganizations(request),
  ]);
  if (!loggedIn) {
    throw redirect(href("/signin"));
  }
  if (!admin || organizations.length > 0) {
    throw redirect(href("/"));
  }
}
