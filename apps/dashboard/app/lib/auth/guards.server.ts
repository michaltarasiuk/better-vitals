import { isDefined } from "@lite-app/shared/is-defined";
import {
  redirect,
  redirectDocument,
  type MiddlewareFunction,
} from "react-router";

import {
  getServerSession,
  isLoggedIn,
  sessionContext,
} from "~/lib/auth/session.server";

import {
  getAuthenticatedRedirectHref,
  getUnauthenticatedRedirectHref,
} from "./href.server";

export const requireUnauthenticated: MiddlewareFunction<Response> = async ({
  request,
}) => {
  if (!(await isLoggedIn(request))) {
    return;
  }
  const redirectHref = await getAuthenticatedRedirectHref(request);
  throw redirectDocument(redirectHref);
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
