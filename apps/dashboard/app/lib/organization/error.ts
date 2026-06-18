import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

type OrganizationError = z.infer<typeof OrganizationErrorSchema>;
type OrganizationErrorCode = z.infer<typeof OrganizationErrorCodeSchema>;

const OrganizationErrorCodeSchema = z.enum([
  "ORGANIZATION_ALREADY_EXISTS",
  "ORGANIZATION_SLUG_ALREADY_TAKEN",
]);
const OrganizationErrorSchema = z.object({
  code: OrganizationErrorCodeSchema,
  message: z.string(),
});

export function isOrganizationError(
  value: unknown
): value is OrganizationError {
  return OrganizationErrorSchema.safeParse(value).success;
}

export function mapOrganizationErrorCodeToField(code: OrganizationErrorCode) {
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
