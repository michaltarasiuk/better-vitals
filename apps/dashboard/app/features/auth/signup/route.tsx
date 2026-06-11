import { href, redirect } from "react-router";

import { hasExistingUser } from "~/lib/auth/index.server";

import { Signup } from "./route.client";

export { clientAction } from "./route.client";

export async function ServerComponent() {
  if (await hasExistingUser()) {
    throw redirect(href("/signin"));
  }
  return <Signup />;
}
