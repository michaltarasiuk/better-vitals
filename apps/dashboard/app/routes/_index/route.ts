import { redirect } from "react-router";

import {
  getAuthenticatedRedirectHref,
  getUnauthenticatedRedirectHref,
} from "~/lib/auth/href.server";
import { isLoggedIn } from "~/lib/auth/session.server";

import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const redirectHref = (await isLoggedIn(request))
    ? await getAuthenticatedRedirectHref(request)
    : await getUnauthenticatedRedirectHref();

  throw redirect(redirectHref);
}
