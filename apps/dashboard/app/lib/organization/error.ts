import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

export type OrganizationError = z.infer<typeof OrganizationErrorSchema>;
export type OrganizationErrorCode = z.infer<typeof OrganizationErrorCodeSchema>;

export const OrganizationErrorCodeSchema = z.enum([
  "ORGANIZATION_ALREADY_EXISTS",
  "ORGANIZATION_SLUG_ALREADY_TAKEN",
]);
export const OrganizationErrorSchema = z.object({
  code: OrganizationErrorCodeSchema,
  message: z.string(),
});

export function isKnownOrganizationError(
  error: unknown
): error is OrganizationError {
  return OrganizationErrorSchema.safeParse(error).success;
}

export function getOrganizationErrorField(code: OrganizationErrorCode) {
  let field: "name";
  switch (code) {
    case "ORGANIZATION_ALREADY_EXISTS":
    case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
      field = "name";
      break;
    }
    default: {
      assertNever(code);
    }
  }
  return field;
}
