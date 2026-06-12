import { href } from "react-router";

import { userExists } from "~/lib/db/user";

export async function getUnauthenticatedRedirectHref() {
  return (await userExists()) ? href("/signin") : href("/signup");
}
