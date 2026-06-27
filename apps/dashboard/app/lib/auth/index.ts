import { createAuthClient, type BetterFetchResponse } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";

import { AuthClientFetchError, AuthError } from "~/lib/auth/error";

export const authClient = createAuthClient({
  plugins: [adminClient(), organizationClient()],
});

async function unwrapAuthResponse<T>({
  operation,
  promise,
}: {
  operation: string;
  promise: Promise<BetterFetchResponse<T>>;
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
  return unwrapAuthResponse({
    operation: "get session",
    promise: authClient.getSession(...params),
  });
}

export function signUpEmail(
  ...params: Parameters<typeof authClient.signUp.email>
) {
  return unwrapAuthResponse({
    operation: "sign up",
    promise: authClient.signUp.email(...params),
  });
}

export function signInEmail(
  ...params: Parameters<typeof authClient.signIn.email>
) {
  return unwrapAuthResponse({
    operation: "sign in",
    promise: authClient.signIn.email(...params),
  });
}

export function requestPasswordReset(
  ...params: Parameters<typeof authClient.requestPasswordReset>
) {
  return unwrapAuthResponse({
    operation: "request password reset",
    promise: authClient.requestPasswordReset(...params),
  });
}

export function resetPassword(
  ...params: Parameters<typeof authClient.resetPassword>
) {
  return unwrapAuthResponse({
    operation: "reset password",
    promise: authClient.resetPassword(...params),
  });
}
