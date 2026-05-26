import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

export type OrganizationError = z.infer<typeof organizationErrorSchema>;
export type OrganizationErrorCode = z.infer<typeof organizationErrorCodeSchema>;

export const ORGANIZATION_ERROR_CODES = [
  "ORGANIZATION_ALREADY_EXISTS",
  "ORGANIZATION_SLUG_ALREADY_TAKEN",
  "YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION",
  "YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS",
] as const;

export const organizationErrorCodeSchema = z.enum(ORGANIZATION_ERROR_CODES);
export const organizationErrorSchema = z.object({
  code: organizationErrorCodeSchema,
  message: z.string(),
});

export function isOrganizationError(
  error: unknown
): error is OrganizationError {
  return organizationErrorSchema.safeParse(error).success;
}

export function getOrganizationErrorField(code: OrganizationErrorCode) {
  switch (code) {
    case "ORGANIZATION_ALREADY_EXISTS":
    case "ORGANIZATION_SLUG_ALREADY_TAKEN":
    case "YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION":
    case "YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS": {
      return "name";
    }
    default: {
      assertNever(code);
    }
  }
}
