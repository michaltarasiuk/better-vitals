import { isDefined } from "@lite-app/shared/is-defined";
import {
  redirect,
  redirectDocument,
  type MiddlewareFunction,
} from "react-router";

import {
  getAuthenticatedRedirectHref,
  getUnauthenticatedRedirectHref,
} from "~/lib/auth/href.server";
import {
  getSession,
  isLoggedIn,
  sessionContext,
} from "~/lib/auth/session.server";

export const requireUnauthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  const loggedIn = await isLoggedIn(request);
  if (!loggedIn) {
    return;
  }
  const redirectHref = await getAuthenticatedRedirectHref(request);
  throw redirectDocument(redirectHref);
};

export const requireAuthenticated: MiddlewareFunction<Response> = async ({
  request,
  context,
}) => {
  const session = await getSession({
    headers: request.headers,
  });
  if (session instanceof Error) {
    console.error(session);
    throw session;
  }
  if (!isDefined(session)) {
    const redirectHref = await getUnauthenticatedRedirectHref();
    if (redirectHref instanceof Error) {
      throw redirectHref;
    }
    throw redirect(redirectHref);
  }
  context.set(sessionContext, session);
};
