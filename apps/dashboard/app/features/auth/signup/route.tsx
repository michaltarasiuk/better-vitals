import { href, redirect } from "react-router";

import { userExists } from "~/lib/db/user";

import { Signup } from "./route.client";

export { clientAction } from "./route.client";

export async function ServerComponent() {
  if (await userExists()) {
    throw redirect(href("/signin"));
  }
  return <Signup />;
}
