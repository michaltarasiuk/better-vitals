import { href, redirect, type LoaderFunctionArgs } from "react-router";

import { isAdmin } from "~/lib/auth/session.server";

import { CreateOrganizationForm } from "./create.client";

export async function loader({ request }: LoaderFunctionArgs) {
  if (!(await isAdmin(request))) {
    throw redirect(href("/signin"));
  }
}

export default function CreateOrganization() {
  return <CreateOrganizationForm />;
}
