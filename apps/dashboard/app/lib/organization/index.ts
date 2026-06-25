import { isDefined } from "@lite-app/shared/is-defined";

import { authClient } from "~/lib/auth";
import { AuthClientFetchError } from "~/lib/auth/error";
import { OrganizationError } from "~/lib/organization/error";

async function unwrapOrganizationClientResult<T>({
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
  if (isDefined(error) || !isDefined(data)) {
    return new OrganizationError({
      operation,
      cause: error,
    });
  }
  return data;
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
