import { isDefined } from "@lite-app/shared/is-defined";
import { href, redirect } from "react-router";

import { auth } from "~/lib/auth/index.server";
import { isLoggedIn } from "~/lib/auth/session.server";

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
  try {
    await auth.api.acceptInvitation({
      body: {
        invitationId: id,
      },
      headers: request.headers,
    });
  } catch {
    throw new Response("Bad Request", { status: 400 });
  }
  throw redirect(
    href("/organization/:slug", {
      slug: params.slug,
    })
  );
}
