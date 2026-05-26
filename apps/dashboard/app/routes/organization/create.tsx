import { href, redirect, type LoaderFunctionArgs } from "react-router";

import { isAdmin, isLoggedIn } from "~/lib/auth/session.server";
import { hasUserOrganizations } from "~/lib/organization/session.server";

import { CreateOrganizationForm } from "./create.client";

export async function loader({ request }: LoaderFunctionArgs) {
  if (!(await isLoggedIn(request))) {
    throw redirect(href("/signin"));
  }
  if (!(await isAdmin(request)) || (await hasUserOrganizations(request))) {
    throw redirect(href("/"));
  }
}

export default function CreateOrganization() {
  return <CreateOrganizationForm />;
}
