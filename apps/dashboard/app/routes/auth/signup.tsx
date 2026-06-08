import { href, redirect } from "react-router";

import { hasExistingUser } from "~/lib/auth/index.server";

import { Signup } from "./signup.client";

export { clientAction } from "./signup.client";

export async function ServerComponent() {
  if (await hasExistingUser()) {
    throw redirect(href("/signin"));
  }
  return <Signup />;
}
