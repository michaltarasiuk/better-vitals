import { isDefined } from "@lite-app/shared/is-defined";
import { href, redirect, type MiddlewareFunction } from "react-router";

import { getUnauthenticatedRedirectHref } from "~/lib/auth/index.server";
import {
  getServerSession,
  isLoggedIn,
  sessionContext,
} from "~/lib/auth/session.server";

export const requireUnauthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  if (await isLoggedIn(request)) {
    throw redirect(href("/"));
  }
};

export const requireAuthenticated: MiddlewareFunction<Response> = async ({
  request,
  context,
}) => {
  const session = await getServerSession(request);
  if (!isDefined(session)) {
    throw redirect(await getUnauthenticatedRedirectHref());
  }
  context.set(sessionContext, session);
};
