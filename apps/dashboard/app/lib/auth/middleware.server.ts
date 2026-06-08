import { href, redirect, type MiddlewareFunction } from "react-router";

import { isLoggedIn } from "~/lib/auth/session.server";

export const requireUnauthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  if (await isLoggedIn(request)) {
    throw redirect(href("/"));
  }
};
