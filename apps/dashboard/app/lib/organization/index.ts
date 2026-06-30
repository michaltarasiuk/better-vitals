import type { BetterFetchResponse } from "better-auth/client";

import { authClient } from "~/lib/auth";
import { AuthClientFetchError } from "~/lib/auth/error";
import { OrganizationError } from "~/lib/organization/error";

async function unwrapOrganizationResponse<T>({
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
    return new OrganizationError({
      operation,
      cause: result.error,
    });
  }
  return result.data;
}

export function getFullOrganization(
  ...params: Parameters<typeof authClient.organization.getFullOrganization>
) {
  return unwrapOrganizationResponse({
    operation: "get full organization",
    promise: authClient.organization.getFullOrganization(...params),
  });
}

export function listOrganizations(
  ...params: Parameters<typeof authClient.organization.list>
) {
  return unwrapOrganizationResponse({
    operation: "list organizations",
    promise: authClient.organization.list(...params),
  });
}

export function createOrganization(
  ...params: Parameters<typeof authClient.organization.create>
) {
  return unwrapOrganizationResponse({
    operation: "create organization",
    promise: authClient.organization.create(...params),
  });
}
