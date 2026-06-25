import type { BetterFetchResponse } from "better-auth/client";

import { authClient } from "~/lib/auth";
import { NetworkError } from "~/lib/http/error";
import { OrganizationError } from "~/lib/organization/error";

async function unwrapOrganizationClientResult<T>({
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
  return unwrapOrganizationClientResult({
    operation: "get full organization",
    promise: authClient.organization.getFullOrganization(...params),
  });
}

export function listOrganizations(
  ...params: Parameters<typeof authClient.organization.list>
) {
  return unwrapOrganizationClientResult({
    operation: "list organizations",
    promise: authClient.organization.list(...params),
  });
}

export function createOrganization(
  ...params: Parameters<typeof authClient.organization.create>
) {
  return unwrapOrganizationClientResult({
    operation: "create organization",
    promise: authClient.organization.create(...params),
  });
}

export function inviteMember(
  ...params: Parameters<typeof authClient.organization.inviteMember>
) {
  return unwrapOrganizationClientResult({
    operation: "invite member",
    promise: authClient.organization.inviteMember(...params),
  });
}
