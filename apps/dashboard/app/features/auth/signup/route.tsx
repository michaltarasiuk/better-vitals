import { href, redirect } from "react-router";

import { hasUsers } from "~/lib/db/user.server";

import { Signup } from "./signup";

export { clientAction } from "./signup";

export async function loader() {
  if (await hasUsers()) {
    throw redirect(href("/signin"));
  }
  return null;
}

export default function SignupRoute() {
  return <Signup />;
}
