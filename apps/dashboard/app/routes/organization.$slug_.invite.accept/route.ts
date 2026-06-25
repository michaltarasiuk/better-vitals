import { isDefined } from "@lite-app/shared/is-defined";
import { href, redirect } from "react-router";

import { isLoggedIn } from "~/lib/auth/session.server";
import { acceptInvitation } from "~/lib/organization/index.server";

import type { Route } from "./+types/route";

export async function loader({ params, request, url }: Route.LoaderArgs) {
  const id = url.searchParams.get("id");
  if (!isDefined(id)) {
    throw new Response("Bad Request", { status: 400 });
  }
  const loggedIn = await isLoggedIn(request);
  if (!loggedIn) {
    throw redirect(
      `${href("/signup")}?${new URLSearchParams({
        invitationId: id,
      })}`
    );
  }
  const invitation = await acceptInvitation({
    body: {
      invitationId: id,
    },
    headers: request.headers,
  });
  if (invitation instanceof Error) {
    console.error(invitation);
    throw new Response("Bad Request", { status: 400 });
  }
  throw redirect(
    href("/organization/:slug", {
      slug: params.slug,
    })
  );
}
