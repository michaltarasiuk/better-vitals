import { redirect } from "react-router";

import { hasExistingUser } from "~/lib/auth/index.server";

export { clientAction, Signup as default } from "./signup.client";

export async function loader() {
  if (await hasExistingUser()) {
    throw redirect("/signin");
  }
}
