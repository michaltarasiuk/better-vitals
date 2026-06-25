import { createAuthClient, type BetterFetchResponse } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";

import { AuthError } from "~/lib/auth/error";
import { NetworkError } from "~/lib/http/error";

export const authClient = createAuthClient({
  plugins: [adminClient(), organizationClient()],
});

async function unwrapAuthClientResult<T>({
  operation,
  promise,
}: {
  operation: string;
  promise: Promise<BetterFetchResponse<T>>;
}) {
  const result = await promise.catch(
    (error) =>
      new NetworkError({
        operation,
        cause: error,
      })
  );
  if (result instanceof Error) {
    return result;
  }
  if (result.error !== null) {
    return new AuthError({
      operation,
      cause: result.error,
    });
  }
  return result.data;
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
