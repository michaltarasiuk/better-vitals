import { auth } from "~/lib/auth/index.server";
import { OrganizationError } from "~/lib/organization/error";

export function getFullOrganization(
  ...params: Parameters<typeof auth.api.getFullOrganization>
) {
  return auth.api.getFullOrganization(...params).catch(
    (error) =>
      new OrganizationError({
        operation: "get full organization",
        cause: error,
      })
  );
}

export function listOrganizations(
  ...params: Parameters<typeof auth.api.listOrganizations>
) {
  return auth.api.listOrganizations(...params).catch(
    (error) =>
      new OrganizationError({
        operation: "list organizations",
        cause: error,
      })
  );
}

export function setActiveOrganization(
  ...params: Parameters<typeof auth.api.setActiveOrganization>
) {
  return auth.api.setActiveOrganization(...params).catch(
    (error) =>
      new OrganizationError({
        operation: "set active organization",
        cause: error,
      })
  );
}

export function acceptInvitation(
  ...params: Parameters<typeof auth.api.acceptInvitation>
) {
  return auth.api.acceptInvitation(...params).catch(
    (error) =>
      new OrganizationError({
        operation: "accept invitation",
        cause: error,
      })
  );
}
