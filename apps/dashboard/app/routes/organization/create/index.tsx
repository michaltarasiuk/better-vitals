import { href, redirect, type LoaderFunctionArgs } from "react-router";

import { isAdmin, isLoggedIn } from "~/lib/auth/session.server";
import { getUserOrganizations } from "~/lib/organization/session.server";

export { clientAction, CreateOrganization as default } from "./index.client";

export async function loader({ request }: LoaderFunctionArgs) {
  const loggedIn = await isLoggedIn(request);
  if (!loggedIn) {
    throw redirect(href("/signin"));
  }
  const [admin, organizations] = await Promise.all([
    isAdmin(request),
    getUserOrganizations(request),
  ]);
  if (!admin || organizations.length > 0) {
    throw redirect(href("/"));
  }
}
