import { href, redirect, type MiddlewareFunction } from "react-router";

import { getUnauthenticatedRedirectHref } from "~/lib/auth/index.server";
import { isLoggedIn } from "~/lib/auth/session.server";

export const requireUnauthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  if (await isLoggedIn(request)) {
    throw redirect(href("/"));
  }
};

export const requireAuthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  if (!(await isLoggedIn(request))) {
    throw redirect(await getUnauthenticatedRedirectHref());
  }
};
