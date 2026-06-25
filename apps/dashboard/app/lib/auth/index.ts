import { isDefined } from "@lite-app/shared/is-defined";
import { createAuthClient } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";

import { AuthClientFetchError, AuthError } from "~/lib/auth/error";

export const authClient = createAuthClient({
  plugins: [adminClient(), organizationClient()],
});

async function unwrapAuthClientResult<T>({
  operation,
  promise,
}: {
  operation: string;
  promise: Promise<{ data: T; error: unknown }>;
}) {
  const result = await promise.catch(
    (error) =>
      new AuthClientFetchError({
        operation,
        cause: error,
      })
  );
  if (result instanceof Error) {
    return result;
  }
  const { data, error } = result;
  const success = isDefined(data) && !isDefined(error);
  if (!success) {
    return new AuthError({
      operation,
      cause: error,
    });
  }
  return data;
}

export function getSession(
  ...params: Parameters<typeof authClient.getSession>
) {
  return unwrapAuthClientResult({
    operation: "get session",
    promise: authClient.getSession(...params),
  });
}

export function signUpEmail(
  ...params: Parameters<typeof authClient.signUp.email>
) {
  return unwrapAuthClientResult({
    operation: "sign up",
    promise: authClient.signUp.email(...params),
  });
}

export function signInEmail(
  ...params: Parameters<typeof authClient.signIn.email>
) {
  return unwrapAuthClientResult({
    operation: "sign in",
    promise: authClient.signIn.email(...params),
  });
}

export function requestPasswordReset(
  ...params: Parameters<typeof authClient.requestPasswordReset>
) {
  return unwrapAuthClientResult({
    operation: "request password reset",
    promise: authClient.requestPasswordReset(...params),
  });
}

export function resetPassword(
  ...params: Parameters<typeof authClient.resetPassword>
) {
  return unwrapAuthClientResult({
    operation: "reset password",
    promise: authClient.resetPassword(...params),
  });
}
