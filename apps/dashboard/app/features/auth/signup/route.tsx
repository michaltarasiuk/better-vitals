import { href, redirect } from "react-router";

import { userExists } from "~/lib/db/user.server";

import { Signup } from "./signup";

export { clientAction } from "./signup";

export async function ServerComponent() {
  if (await userExists()) {
    throw redirect(href("/signin"));
  }
  return <Signup />;
}
